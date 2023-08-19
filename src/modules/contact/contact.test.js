import { render, screen } from '@testing-library/react';
import callServicesGetContact from '../../Action/ActionGetContact';
import Contact from './contact';

jest.mock('../../Action/ActionGetContact');

describe('Component: Contact', () => {
    it('displays returned contact', async () => {
        callServicesGetContact.mockResolvedValue({
            data: [
                {
                    "id": "93ad6070-c92b-11e8-b02f-cbfa15db428b",
                    "firstName": "Bilbo",
                    "lastName": "Baggins",
                    "age": 111,
                    "photo": "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550"
                },
                {
                    "firstName": "Rrrrrr",
                    "lastName": "Yyyyy",
                    "age": 12,
                    "photo": "file:///Users/umaaamm/Library/Developer/CoreSimulator/Devices/BE76D79B-C9AF-4664-B672-90EF4A07D658/data/Containers/Data/Application/2F38F770-AFFF-4C79-9301-CCC7B796158C/tmp/60F48529-BFDB-48E5-876C-227CF80793F5.jpg",
                    "id": "88bd8e20-3eb9-11ee-81d5-b1cfcae72e21"
                }
            ],
        });

        render(<Contact />);

        const displayedContact = await screen.findAllByTestId(/task-id-\d+/);
        expect(displayedContact).toHaveLength(2);
        expect(screen.getByText('Bilbo')).toBeInTheDocument();
        expect(screen.getByText('Rrrrrr')).toBeInTheDocument();
    });
});