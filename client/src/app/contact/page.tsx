'use client';

function Contact() {
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default behaviour
    e.preventDefault();

    // Reset inputs
    e.currentTarget.reset();
  };

  return (
    <>
      <main>
        <section className="mx-auto mt-8 max-w-md">
          <h5>
            Hello! 🙋🏻‍♂ My name is Rafał and i'm the creator of this page. I hope
            you find some new food inspiration here (i know the struggle). If
            you have any comments, do not hesitate to send me a message!
          </h5>
          <form
            onSubmit={sendEmail}
            className="mt-6 grid rounded-sm border bg-purple-400 p-2"
          >
            <label htmlFor="from_name">Name</label>
            <input
              type="text"
              name="from_name"
              autoComplete="first-name"
              className="rounded-sm p-1 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <label htmlFor="user_mail">Email</label>
            <input
              type="email"
              name="user_mail"
              autoComplete="email"
              required
            />
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" rows={5} required />
            <button
              type="submit"
              className="my-2 rounded-sm bg-black p-1 text-white"
            >
              Send
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default Contact;
