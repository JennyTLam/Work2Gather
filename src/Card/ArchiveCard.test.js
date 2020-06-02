import React from 'react';
import { render, fireEvent, waitForElement, screen, } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { ExpansionPanelActions } from '@material-ui/core';
import ArchiveCard from './ArchiveCard';
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
        "confirmed": true,
        "startDate": "06/01/2020",
        "endDate": "",
        "duration": 2,
        "progress":{
            "Suzy":
                [
                    5,
                    5,
                    4,
                    7,
                    3,
                    12,
                    132,
                    11,
                    1,
                    8,
                    9,
                    7,
                    3,
                    8
                ],
            "Johnny":
                [
                    1,
                    2,
                    5,
                    9,
                    6,
                    4,
                    3,
                    2,
                    11,
                    3,
                    12,
                    12,
                    10,
                    8
                ]
        },
        "title": "Do Daily Pushups",
        "description": "Do 10 pushups a day.",
        "groupMembers": {
            "creator": "Suzy",
            "invitee": "Johnny"
        }
    };
    render(<ArchiveCard goal={goal}/>)
    fireEvent.click(screen.getByText('Review Goal'))
    await waitForElement(() => screen.getByText('Close'))
    fireEvent.click(screen.getByText('Review Goal'))
});

