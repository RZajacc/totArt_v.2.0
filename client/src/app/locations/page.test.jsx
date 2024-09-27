import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Content from './page';
import AddLocationLink from '@/_components/locations/AddLocationLink';
import { AuthContext } from '@/context/AuthContext';

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
            _id: 'testid',
            title: 'location_title',
            image: {
              width: 1024,
              height: 1365,
              secure_url: 'https://my-image.jpg',
            },
          },
        ],
      }),
  }),
);

describe('locations page component', () => {
  it('renders a span containing the number of locations fetched', async () => {
    // Render the content page (async server component)
    const content = await Content();
    render(content);
    // Get the heading element
    const spanEl = screen.getByTestId('locations-count');
    // Check if span is being rendered
    expect(spanEl).toBeInTheDocument();
    // Mocked data contain only one entry so the number should match
    expect(spanEl).toHaveTextContent(1);
  });

  it('renders addLocation link if user is logged in', () => {
    // Mock user data
    const user = { id: '1', name: 'Rafal' };
    // Render context around the link
    render(
      <AuthContext.Provider value={{ user: user }}>
        <AddLocationLink />
      </AuthContext.Provider>,
    );

    // Check if link is being rendered
    expect(screen.getByTestId('addLocationLink')).toBeInTheDocument();
  });

  it('should not render addLocation link if user is not logged in', () => {
    // Mock user data
    const user = undefined;
    // Render context around the link
    render(
      <AuthContext.Provider value={{ user: user }}>
        <AddLocationLink />
      </AuthContext.Provider>,
    );
    // Check if link is being rendered
    expect(screen.queryByTestId('addLocationLink')).not.toBeInTheDocument();
  });

  it('should render one location card', async () => {
    // Render the content page (async server component)
    const content = await Content();
    render(content);

    // Get all location cards
    const locationCards = screen.getAllByTestId('locationCard');

    // Since mock contains only one object, locations card should also contain just one
    expect(locationCards).toHaveLength(1);
  });
});
