'use client';

import useSWRMutation from 'swr/mutation';
import { sendContactEmail } from '../../fetchers/SendContactEmail';
import { useState } from 'react';
import LabeledInput from '../../_components/formElements/LabeledInput';

function Contact() {
  const { trigger: triggerSendingEmail, error: emailError } = useSWRMutation(
    'http://localhost:5000/api/email/sendEmail',
    sendContactEmail,
  );

  const [emailResponse, setEmailResponse] = useState('');

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behaviour
    e.preventDefault();

    // Capture the form reference
    const form = e.currentTarget;

    // Create a form data object
    const formData = new FormData(form);
    const fromName = formData.get('from_name') as string;
    const subject = formData.get('subject') as string;
    const fromEmail = formData.get('from_email') as string;
    const message = formData.get('message') as string;

    // Send an email
    const test = await triggerSendingEmail({
      name: fromName,
      email: fromEmail,
      subject: subject,
      message: message,
    });

    setEmailResponse(test.msg);

    // Reset inputs
    form.reset();
  };

  return (
    <>
      <main>
        <section className="mx-auto mt-4 max-w-md">
          <h5>
            Hello! 🙋🏻‍♂ My name is Rafał and i'm the creator of this page. I hope
            you're enjoying using this page. If you have any comments, do not
            hesitate to send me a message!
          </h5>
          <form
            onSubmit={sendEmail}
            className=" mt-6 grid gap-1 rounded-md border bg-gradient-to-br from-green-300 to-green-500 p-2 shadow-md shadow-black"
          >
            <LabeledInput
              inputType="text"
              labelFor="from_name"
              labelText="Name:"
            />
            <LabeledInput
              inputType="text"
              labelFor="subject"
              labelText="Subject:"
            />
            <LabeledInput
              inputType="email"
              labelFor="from_email"
              labelText="Email:"
            />

            <label htmlFor="message" className="font-bold">
              Message
            </label>
            <textarea name="message" id="message" rows={3} required />
            <button
              type="submit"
              className="my-2 rounded-sm border border-black bg-black p-1 text-white hover:bg-slate-200 hover:text-black"
            >
              Send
            </button>
          </form>
          {!emailError && <p>{emailResponse}</p>}
        </section>
      </main>
    </>
  );
}

export default Contact;
