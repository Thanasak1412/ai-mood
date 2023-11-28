import { toMatchDiffSnapshot } from "snapshot-diff";
import { vi } from "vitest";

import Home from "@/app/page";
import { User } from "@clerk/backend";
import { auth } from "@clerk/nextjs";
import { fireEvent, getByText, render } from "@testing-library/react";

vi.mock('@clerk/nextjs', () => ({
  auth: () => ({
    userId: 'user_2YVfHANK9tdUhFeXehtazTcDK5C',
  }),
}));

expect.extend({ toMatchDiffSnapshot });

describe('HomePage', () => {
  test('should render home correctly', () => {
    const { getByText } = render(<Home />);

    expect(getByText(/The best journal app, period/i)).toBeInTheDocument();
  });

  test('should redirect to journal entry page when is authenticated', () => {
    const { getByText, asFragment } = render(<Home />);

    const firstRender = asFragment();

    fireEvent.click(getByText(/Get started/i));

    expect(firstRender).not.toMatchSnapshot(asFragment());
  });
});
