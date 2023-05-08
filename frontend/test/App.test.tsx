
import { expect, test } from "vitest";

// import dependencies
import React from 'react'

// import API mocking utilities from Mock Service Worker
import {rest} from 'msw'
import {setupServer} from 'msw/node'

// import react-testing methods
import {render, fireEvent, screen} from '@testing-library/react'

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom'

import {App} from "../src/App.js"


test('click and counts', async () => {
	// Arrange: rendering our page into a var
	let testRender = render(<App  />)
	// Act
	fireEvent.click(screen.getByText('count is 0'))
	// Assert
	expect(screen.getByText('count is 1')).toBeVisible();
})

describe("Renders React components correctly",async ()=>{
	it("should render the page correctly", async ()=>{

		let testrender = render(<App />)
		//setup
		const h1 = await screen.queryByText("Vite + React");

		//expectations
		expect(h1).not.toBeNull();
		expect(h1).toBeVisible();
	})
})


test("Math.sqrt()", () => {
	expect(Math.sqrt(4)).toBe(2);
	expect(Math.sqrt(144)).toBe(12);
	expect(Math.sqrt(2)).toBe(Math.SQRT2);
});
