# Feedbacky Plugin

It provides a feedback modal for your web app without any effort, just import and use.

**How to use?**

## Import

`import 'feedbacky-plugin`

## Usage

`<feedbacky-plugin

          title='SEND YOUR FEEDBACK'

          titleTextColor='purple'

          submitText='WE HAVE GOT YOUR FEEDBACK'

          submitTextColor='green'

          closeButtonColor='transparent'

          closeButtonIconColor='black'

          buttonText='SEND'

          onSubmittingText='SENDING'

          buttonColor='pink'

          buttonTextColor='orange'

          modalOuterBackground='#00000059'

          modalInnerBackground='gray'

          feedbackyIconBackground='#6a2668'

          textAreaPlaceholder='Maximum 2000 characters can be entered'></feedbacky-plugin>`

## **Managing the feedbacks**

In order to provide an easy management on feedbacks, a custom event ('feedback-received') is dispatched to window object, You can easily listen the event as in the example

`window.addEventListener("feedback-received", 
        (e) =>	console.log(e.detail) // output: {feedback:"Awesome!", device:"mobile", path:"/" }
    );
`

### If you want to contribute, you are welcome!
