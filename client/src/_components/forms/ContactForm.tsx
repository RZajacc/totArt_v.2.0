'use client';
// Libraries
import React, { useState } from 'react';
import useSWRMutation from 'swr/mutation';
// Components
import LabeledInput from '../ui/inputs/LabeledInput';
import LabeledTextArea from '../ui/inputs/LabeledTextArea';
import TimerDisplay from '../ui/state/TimerDisplay';
import ButtonDark from '../ui/buttons/ButtonDark';
// Fetching data
import { sendContactEmail } from '@/lib/clientMethods/SendContactEmail';
// Types
import { Rounded } from 'enums/StyleEnums';

type Props = {};

function ContactForm({}: Props) {
  // Sending email logic
  const {
    trigger: triggerSendingEmail,
    error: emailError,
    data,
  } = useSWRMutation(
    `${process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://totart-v-2-0.onrender.com'}/api/email/sendEmail`,
    sendContactEmail,
  );

  const [showEmailResponse, setShowEmailResponse] = useState(false);

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
    await triggerSendingEmail({
      name: fromName,
      email: fromEmail,
      subject: subject,
      message: message,
    });

    setShowEmailResponse(true);

    // Reset inputs
    form.reset();
  };
  return (
    <form
      onSubmit={sendEmail}
      className=" mt-6 grid gap-1 rounded-md border bg-gradient-to-br from-green-300 to-green-500 p-2 shadow-md shadow-black"
    >
      <LabeledInput inputType="text" labelFor="from_name" labelText="Name:" />
      <LabeledInput inputType="text" labelFor="subject" labelText="Subject:" />
      <LabeledInput
        inputType="email"
        labelFor="from_email"
        labelText="Email:"
      />
      <LabeledTextArea labelFor="message" labelText="Message:" rows={3} />
      {!emailError && showEmailResponse && (
        <>
          <p className="text-center font-bold">{data?.msg}</p>
          <TimerDisplay
            onTimeout={() => {
              setShowEmailResponse(false);
            }}
            timeout={5000}
          />
        </>
      )}
      <ButtonDark rounded={Rounded.medium}>Send email!</ButtonDark>
    </form>
  );
}

export default ContactForm;
