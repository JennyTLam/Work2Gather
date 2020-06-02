import React from 'react';
import { render, fireEvent, waitForElement, screen, } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ExpansionPanelActions } from '@material-ui/core';
import ArchiveCard from './ArchiveCard';
import SeeMore from './SeeMore';
import {
    getByLabelText,
    getByText,
    getByTestId,
    queryByTestId,
    waitFor,
  } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

test('check reviewing goal', async () => {
    var goal = {
      "archivedCreator" : true,
      "archivedInvitee" : false,
      "confirmed" : true,
      "deleted" : true,
      "description" : "Do 10 Daily Pushups",
      "duration" : "2",
      "goalType" : "Quantitative",
      "groupMembers" : {
        "creator" : "pCPzcJ55ZZXHd8dTqaPOpmjGf3C2",
        "invitee" : "XYojuhEtUGNlE4eK5adJy23LPi53"
      },
      "key" : "-M6giWrIRV6MwZUIe2lU",
      "lastRemindCreator" : 14,
      "lastRemindInvitee" : -1,
      "metric" : "pushups done",
      "minimum" : "10",
      "progress" : {
        "XYojuhEtUGNlE4eK5adJy23LPi53" : [ 15, 5, 8, 11, 20, 13, 15, 12, 10, 10, 15, 20, 25, 30, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        "pCPzcJ55ZZXHd8dTqaPOpmjGf3C2" : [ 10, 10, 10, 10, 12, 14, 15, 17, 18, 20, 22, 24, 25, 25, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
      },
      "rejected" : false,
      "startDate" : "4/23/2020",
      "title" : "Daily Pushups"
    }

    const {container} = render(<ArchiveCard goal={goal}/>)
    const review = getByTestId(container, "graph")
    expect(review).toBeInTheDocument()
    fireEvent.click(screen.getByText('Review Goal'))
    await waitForElement(() => screen.getByText('Close'))
    fireEvent.click(screen.getByText('Review Goal'))
});
