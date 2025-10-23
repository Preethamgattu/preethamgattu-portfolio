import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../Hero';

describe('Hero Component', () => {
  it('renders the hero section with correct content', () => {
    render(<Hero />);

    // Check if main elements are present
    expect(screen.getByText('Preetham Gattu')).toBeInTheDocument();
    expect(screen.getByText(/Salesforce Developer/)).toBeInTheDocument();
    expect(screen.getByText(/View Projects/)).toBeInTheDocument();
    expect(screen.getByText(/Get In Touch/)).toBeInTheDocument();
  });

  it('displays the typing animation text', () => {
    render(<Hero />);

    // The typing text should be present (initially shows first phrase)
    const typingElement = screen.getByText(/Salesforce Developer|Lightning Expert|Apex Architect|Flow Builder|CRM Specialist/);
    expect(typingElement).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Hero />);

    const heroSection = document.getElementById('home');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveAttribute('id', 'home');
  });
});
