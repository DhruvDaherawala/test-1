import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders landing page with key sections', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // Verify branding or sections exist
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});
