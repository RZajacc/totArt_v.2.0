'use client';
// Libraries
import useSWRMutation from 'swr/mutation';
import { useState } from 'react';
// Components
import LabeledInput from '@/_components/formElements/LabeledInput';
import LabeledTextArea from '@/_components/formElements/LabeledTextArea';
import SubmitButton from '@/_components/formElements/ButtonDark';
import TimerDisplay from '@/_components/ui/TimerDisplay';
// Fetching data
import { sendContactEmail } from '@/fetchers/SendContactEmail';

function Contact() {
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
            <SubmitButton>Send email!</SubmitButton>
          </form>
        </section>
      </main>
    </>
  );
}

export default Contact;
