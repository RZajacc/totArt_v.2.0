// Components
import ContactForm from '@/_components/forms/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact page',
};

function Contact() {
  return (
    <>
      <main>
        <section className="mx-auto mt-4 max-w-md">
          <h5>
            Hello! 🙋🏻‍♂ My name is Rafał and i'm the creator of this page. I hope
            you're enjoying using this page. If you have any comments, do not
            hesitate to send me a message!
          </h5>
          <ContactForm />
        </section>
      </main>
    </>
  );
}

export default Contact;
