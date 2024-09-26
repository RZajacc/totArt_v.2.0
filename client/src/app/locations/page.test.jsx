import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Content from './page';

// Mocking the fetch API globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      // Resolving to single value from the database
      Promise.resolve({
        number: 1,
        locations: [
          {
            _id: '66ab5f067c84e4874f44c3df',
            title: 'Piglet',
            description: 'Simple but touching drawing of a crying piglet',
            location: 'Cannot tell more than that it is in my building',
            image: {
              _id: '66ab5ef37c84e4874f44c3db',
              asset_id: '15b9ef65e676a4bc65394143add81ddf',
              public_id: 'postImages/userImage_1722506990550_350346121',
              version: 1722506994,
              version_id: '5221f6c00b35c23efdb4998f548a184d',
              signature: '0ab58d4dd7cf1127eba37bde03e72c31afea0406',
              width: 1024,
              height: 1365,
              format: 'jpg',
              resource_type: 'image',
              created_at: '2024-08-01T10:09:54Z',
              bytes: 921957,
              type: 'upload',
              etag: '2b037b3a3c97fb6ec2514a4c948b0064',
              placeholder: false,
              url: 'http://res.cloudinary.com/dqdofxwft/image/upload/v1722506994/postImages/userImage_1722506990550_350346121.jpg',
              secure_url:
                'https://res.cloudinary.com/dqdofxwft/image/upload/v1722506994/postImages/userImage_1722506990550_350346121.jpg',
              folder: 'postImages',
              original_filename: 'userImage_1722506990550_350346121',
              __v: 0,
              related_location: '66ab5f067c84e4874f44c3df',
            },
            author: {
              _id: '66ab5aaa2e80144ba6d0316c',
              userName: 'Rafal',
            },
            favs: [],
            comments: ['66c89865739a3d9d9d6ae141', '66f43ed53a081e26b0028a0c'],
            __v: 0,
          },
        ],
      }),
  }),
);

describe('Page', () => {
  it('renders a heading', async () => {
    const content = await Content();
    render(content);
  });
});
