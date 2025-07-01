import darkLogo from '../../assets/icons/dark-logo.svg';
function Contact() {
  return (
    <div className="bg-accent-25 font-main px-6 py-12 flex flex-col gap-8 rounded-[20px] justify-center items-center shadow-custom-gray mt-8">
      {/* Left Section */}
      <div className="flex justify-center items-center gap-5">
        <img src={darkLogo} alt="Logo" className="h-16" />
        <h1 className="text-3xl font-semibold text-neutral-1000 font-main">
          Contact Us
        </h1>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-8 px-6">
        <div className="flex-1 space-y-6">
          <p className="text-[16px] leading-relaxed text-neutral-950">
            Let’s take your business to the next level. <br />
            Reach out to our team we’re here to support, advise, and grow with
            you.
          </p>

          <div className="space-y-2 text-sm">
            <p className="bg-brand-500/20 text-orange-800 rounded-2xl px-2 py-2 w-fit">
              📍 Address: 20 Al-Tayaran Street, 1st Floor, Apartment 2
            </p>
            <p className="bg-brand-500/20 text-yellow-800 rounded-2xl px-2 py-2 w-fit">
              📧 Email: MalathEgypt@.com
            </p>
            <p className="bg-brand-500/20 text-amber-800 rounded-2xl px-2 py-2 w-fit">
              📞 Phone: 0222604857
            </p>
            <p className="bg-brand-500/20 text-yellow-800 rounded-2xl px-2 py-2 w-fit">
              📱 Mobile: 01008375583 / 01099134464
            </p>
            <p className="bg-brand-500/20 text-rose-800 rounded-2xl px-2 py-2 w-fit">
              🧾 Tax Certificate Number: 6820
            </p>
          </div>
        </div>

        {/* Right Section */}
        <form className="flex-1 space-y-4">
          <div>
            <label className="block mb-1 text-sm text-neutral-700">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-neutral-700">
              Massage
            </label>
            <textarea
              rows="6"
              className="w-full border rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>

          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-[#18103F] hover:bg-[#1e144d] text-white px-6 py-2 rounded-md text-sm"
            >
              send
            </button>
            <button
              type="reset"
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-md text-sm"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
