import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactUs, { validateContactForm } from './ContactUs';

describe('ContactUs Form Validation (Problem 3)', () => {
  describe('validateContactForm unit tests', () => {
    it('requires name, email, and message', () => {
      const errors = validateContactForm({ name: '', email: '', subject: '', message: '' });
      expect(errors.name).toBe('Full name is required');
      expect(errors.email).toBe('Email address is required');
      expect(errors.message).toBe('Message is required');
    });

    it('validates minimum length for name and message', () => {
      const errors = validateContactForm({
        name: 'A',
        email: 'test@example.com',
        subject: '',
        message: 'short'
      });
      expect(errors.name).toBe('Name must be at least 2 characters');
      expect(errors.message).toBe('Message must be at least 10 characters');
      expect(errors.email).toBeUndefined();
    });

    it('validates email format', () => {
      const invalidErrors = validateContactForm({
        name: 'Jane Doe',
        email: 'not-an-email',
        subject: '',
        message: 'This is a long enough valid message.'
      });
      expect(invalidErrors.email).toBe('Please enter a valid email address (e.g. name@domain.com)');

      const validErrors = validateContactForm({
        name: 'Jane Doe',
        email: 'jane@company.org',
        subject: '',
        message: 'This is a long enough valid message.'
      });
      expect(validErrors.email).toBeUndefined();
    });
  });

  describe('ContactUs Component Interactivity', () => {
    it('blocks submit and displays inline errors when submitting an empty form', async () => {
      render(<ContactUs />);

      const submitButton = screen.getByRole('button', { name: /send message/i });
      fireEvent.click(submitButton);

      expect(await screen.findByText('Full name is required')).toBeInTheDocument();
      expect(screen.getByText('Email address is required')).toBeInTheDocument();
      expect(screen.getByText('Message is required')).toBeInTheDocument();
    });

    it('shows inline error on blur of invalid field', async () => {
      render(<ContactUs />);

      const emailInput = screen.getByPlaceholderText('john@example.com');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);

      expect(
        await screen.findByText('Please enter a valid email address (e.g. name@domain.com)')
      ).toBeInTheDocument();
    });

    it('successfully submits valid form and displays confirmation message', async () => {
      render(<ContactUs />);

      const nameInput = screen.getByPlaceholderText('John Doe');
      const emailInput = screen.getByPlaceholderText('john@example.com');
      const messageInput = screen.getByPlaceholderText(
        'Tell us about your project requirements, scope, and timeline...'
      );

      fireEvent.change(nameInput, { target: { value: 'Alice Smith' } });
      fireEvent.change(emailInput, { target: { value: 'alice@innovate.co' } });
      fireEvent.change(messageInput, {
        target: { value: 'We need a scalable full-stack team for an AI project.' }
      });

      const submitButton = screen.getByRole('button', { name: /send message/i });
      fireEvent.click(submitButton);

      // Loading state indicator
      expect(screen.getByText(/sending message\.\.\./i)).toBeInTheDocument();

      // Wait for mock submission to resolve
      await waitFor(
        () => {
          expect(screen.getByText('Message Sent Successfully!')).toBeInTheDocument();
        },
        { timeout: 2000 }
      );

      expect(screen.getByText(/Alice Smith/)).toBeInTheDocument();

      // Clicking "Send Another Message" resets the form
      const resetButton = screen.getByRole('button', { name: /send another message/i });
      fireEvent.click(resetButton);

      expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
    });
  });
});
