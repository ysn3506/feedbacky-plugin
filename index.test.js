import { FeedbackyPlugin } from "./index.js"; // Adjust the path accordingly
import { expect } from "chai";


describe("FeedbackyPlugin", () => {
	let element;

	beforeEach(() => {
		element = new FeedbackyPlugin();
	});

	it("should have default values set correctly", () => {
		expect(element.open).to.be.false;
		expect(element.loading).to.be.false;
		expect(element.submitted).to.be.false;
		expect(element.allowToSend).to.be.false;
	});

	it("should toggle modal when calling toggleModal", () => {
		element.toggleModal();
		expect(element.open).to.be.true;

		element.toggleModal();
		expect(element.open).to.be.false;
	});
	it("should correctly determine if it is on mobile/tablet", () => {
		// Mock userAgent for mobile
		Object.defineProperty(globalThis, "navigator", {
			value: {
				userAgent:
					"Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
			},
			configurable: true,
			writable: true,
		});

		expect(element.isMobileTablet()).to.be.true;

		// Reset userAgent
		Object.defineProperty(globalThis, "navigator", {
			value: {
				userAgent:
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
			},
			configurable: true,
			writable: true,
		});

		// Call the method again after resetting userAgent
		expect(element.isMobileTablet()).to.be.false;
	});
});
