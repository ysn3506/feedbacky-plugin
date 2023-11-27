import { LitElement, html, css } from "lit";
import { styleMap } from "lit/directives/style-map.js";

export class FeedbackyPlugin extends LitElement {
	static get properties() {
		return {
			open: { type: Boolean, state: true },
			loading: { type: Boolean, state: true },
			submitted: { type: Boolean, state: true },
			_feedback: { type: String, state: true },
			title: { type: String },
			titleTextColor: { type: String },
			submitText: { type: String },
			submitTextColor: { type: String },
			closeButtonColor: { type: String },
			closeButtonIconColor: { type: String },
			buttonText: { type: String },
			onSubmittingText: { type: String },
			buttonColor: { type: String },
			buttonTextColor: { type: String },
			modalOuterBackground: { type: String },
			modalInnerBackground: { type: String },
			feedbackyIconBackground: { type: String },
			feedbackyIconColor: { type: String },
			fontFamily: { type: String },
			textAreaPlaceholder: { type: String },
		};
	}

	constructor() {
		super();
		this.open = false;
		this.loading = false;
		this.submitted = false;
		this.allowToSend = false;
		this._feedback = "";
	}

	static styles = css`
		.feedbacky-wrapper {
			position: fixed;
			z-index: 2147483646;
			right: 0;
			bottom: 0;
		}

		.feedbacky-sticky-button {
			width: 5rem;
			height: 5rem;
			padding: 1rem;
		}

		.modal {
			position: fixed;
			z-index: 2147483647;
			width: 100vw;
			height: 100vh;
			top: 0;
			left: 0;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.modal-inner {
			position: relative;
			max-width: 600px;
			max-height: 800px;
			width: 80%;
			padding: 2rem 1rem;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			text-align: center;
		}

		.close-button {
			position: absolute;
			right: 0.25rem;
			top: 0.25rem;
			border: none;
		}

		.modal-wrapper {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 1rem;
			width: 95%;
			@media screen and (min-width: 968px) {
				width: 85%;
			}
		}

		h1 {
			font-weight: 900;
		}

		textarea {
			width: 95%;
			min-height: 15rem;
		}

		.submit-button {
			width: 100%;
			min-height: 2.5rem;
			margin: auto;
			border: none;
			border-radius: 5px;
			font-size: 1.25rem;
		}

		.submit-button:hover {
			cursor: pointer;
		}

		.submit-button:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}

		.submit-button:active {
			transform: scale(0.98);
		}
	`;

	toggleModal() {
		this.open = !this.open;
	}

	isMobileTablet() {
		let check = false;
		(function (a) {
			if (
				/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
					a
				) ||
				/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
					a.substr(0, 4)
				)
			)
				check = true;
		})(navigator.userAgent || navigator.vendor || window.opera);
		return check;
	}

	sendFeedback() {
		// send feedback to window with custom event
		const sendFeedbackEvent = new CustomEvent("feedback-received", {
			detail: {
				feedback: this._feedback,
				path: window.location.pathname,
				device: this.isMobileTablet() ? "mobile" : "desktop",
			},
			bubbles: true,
			composed: true,
		});

		if (this._feedback.length > 3) {
			this.loading = true;
			this.dispatchEvent(sendFeedbackEvent);
			this.submitted = true;
			this.loading = false;
			setTimeout(() => {
				this.submitted = false;
				this.open = false;
				clearTimeout();
			}, 3000);
		}
	}

	onChange(e) {
		this._feedback = e.target.value;
	}

	renderButton() {
		const styleFeedbackyIconBackground = {
			backgroundColor: this.feedbackyIconBackground || "purple",
			color: "white",
		};

		// stroke will change the color of icon
		const stroke = this.feedbackyIconColor
			? `${this.feedbackyIconColor}`
			: "green";

		return html`<button
			class="feedbacky-sticky-button"
			style=${styleMap(styleFeedbackyIconBackground)}
			@click=${this.toggleModal}>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				stroke=${stroke}>
				<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
				<g
					id="SVGRepo_tracerCarrier"
					stroke-linecap="round"
					stroke-linejoin="round"></g>
				<g id="SVGRepo_iconCarrier">
					<path
						d="M8.24999 18L5.24999 20.25V15.75H2.25C1.85217 15.75 1.47064 15.5919 1.18934 15.3106C0.908034 15.0293 0.749999 14.6478 0.749999 14.25V2.25C0.749999 1.85217 0.908034 1.47064 1.18934 1.18934C1.47064 0.908034 1.85217 0.749999 2.25 0.749999H18.75C19.1478 0.749999 19.5293 0.908034 19.8106 1.18934C20.0919 1.47064 20.25 1.85217 20.25 2.25V6.71484"
						stroke=${stroke}
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path
						d="M5.24999 5.24999H15.75"
						stroke=${stroke}
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path
						d="M5.24999 9.74999H8.24999"
						stroke=${stroke}
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path
						d="M23.25 18.75H20.25V23.25L15.75 18.75H11.25V9.74999H23.25V18.75Z"
						stroke=${stroke}
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
					<path
						d="M19.5 15H15"
						stroke=${stroke}
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"></path>
				</g>
			</svg>
		</button>`;
	}

	renderModal() {
		this.title = this.title || "SEND FEEDBACK";
		this.buttonText = this.buttonText || "SEND";
		this.onSubmittingText = this.onSubmittingText || "SENDING";
		this.submitText = this.submitText || "WE HAVE GOT YOUR FEEDBACK";
		this.textAreaPlaceholder =
			this.textAreaPlaceholder || "You can type 2000 characters maximum";
		const styleTitleTextColor = { color: this.titleTextColor || "black" };
		const styleSubmitTextColor = { color: this.submitTextColor || "black" };
		const styleCloseButtonColor = {
			backgroundColor: this.closeButtonColor || "transparent",
			color: this.closeButtonIconColor || "black",
		};
		const styleButton = {
			backgroundColor: this.buttonColor || "blue",
			color: this.buttonTextColor || "white",
		};

		const styleModalOuterBackground = {
			backgroundColor: this.modalOuterBackground || "#00000059",
			fontFamily: this.fontFamily || "Arial, Helvetica, sans-serif",
		};
		const styleModalInner = {
			backgroundColor: this.modalInnerBackground || "white",
			color: this.titleTextColor || "black",
		};

		return html`<div
			class="modal"
			@click=${this.toggleModal}
			style=${styleMap(styleModalOuterBackground)}>
			<div
				class="modal-inner"
				@click=${(e) => e.stopPropagation()}
				style=${styleMap(styleModalInner)}>
				<button
					class="close-button"
					@click=${this.toggleModal}
					style=${styleMap(styleCloseButtonColor)}>
					X
				</button>
				<div class="modal-wrapper">
					${!this.submitted
						? html`<h2 style=${styleMap(styleTitleTextColor)}>${this.title}</h2>
								<textarea
									placeholder=${this.textAreaPlaceholder}
									required
									resize="none"
									maxlength="2000"
									rows="12"
									cols="50"
									value="${this.feedback}"
									@change=${this.onChange}></textarea>
								<button
									@click=${this.sendFeedback}
									class="submit-button"
									style=${styleMap(styleButton)}>
									${this.loading ? this.onSubmittingText : this.buttonText}
								</button>`
						: html` <h1
								class="sent-info"
								style=${styleMap(styleSubmitTextColor)}>
								${this.submitText}
						  </h1>`}
				</div>
			</div>
		</div>`;
	}

	render() {
		return html`
			<div class="feedbacky-wrapper">
				${!this.open ? this.renderButton() : this.renderModal()}
			</div>
		`;
	}
}

customElements.define("feedbacky-plugin", FeedbackyPlugin);
