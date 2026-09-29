import React, { useState, useId } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdMarkEmailUnread } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi';
import { CgSpinner } from 'react-icons/cg';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validateContactForm = (values) => {
  const errors = {};

  if (!values.name || !values.name.trim()) {
    errors.name = 'Full name is required';
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!values.email || !values.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address (e.g. name@domain.com)';
  }

  if (!values.message || !values.message.trim()) {
    errors.message = 'Message is required';
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
};

const ContactUs = () => {
  const idPrefix = useId();

  const [values, setValues] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = validateContactForm(values);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (field) => (e) => {
    setValues((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleBlur = (field) => () => {
    setTouched((prev) => ({
      ...prev,
      [field]: true
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    if (!isValid) {
      if (errors.name) {
        document.getElementById(`${idPrefix}-name`)?.focus();
      } else if (errors.email) {
        document.getElementById(`${idPrefix}-email`)?.focus();
      } else if (errors.message) {
        document.getElementById(`${idPrefix}-message`)?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setValues({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setTouched({
      name: false,
      email: false,
      subject: false,
      message: false
    });
    setIsSubmitted(false);
  };

  return (
    <div id="contact" className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="lg:flex lg:px-12 xl:px-24 gap-x-10 items-stretch">
        <div className="flex-grow">
          <section className="w-full h-full flex flex-col justify-center bg-gradient-to-l from-[#110D2E]/80 to-[#fc466a4a]/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-6 sm:p-10 lg:p-14">
            <div className="flex flex-col mb-8 text-center sm:text-left">
              <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold mb-2">
                Get in Touch
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Drop Us Your Message
              </h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Freely contact with us anytime. We're available here for you.
              </p>
            </div>

            {isSubmitted ? (
              <div
                role="status"
                aria-live="polite"
                className="bg-[#0b192e]/80 border border-emerald-500/40 rounded-2xl p-8 text-center my-auto animate-fadeIn"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                  <HiCheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-300 max-w-md mx-auto text-sm sm:text-base leading-relaxed mb-6">
                  Thank you, <span className="font-semibold text-white">{values.name || 'there'}</span>. We have received your inquiry and our engineering team will get back to you within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FC466B] to-[#3F5EFB] text-white text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <label
                      htmlFor={`${idPrefix}-name`}
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5"
                    >
                      Full Name <span className="text-pink-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id={`${idPrefix}-name`}
                        name="name"
                        type="text"
                        value={values.name}
                        onChange={handleChange('name')}
                        onBlur={handleBlur('name')}
                        aria-invalid={touched.name && !!errors.name}
                        aria-describedby={touched.name && errors.name ? `${idPrefix}-name-error` : undefined}
                        placeholder="John Doe"
                        className={`w-full px-4 py-2.5 text-sm text-white rounded-xl bg-[#0b0826]/80 border transition-all duration-200 placeholder-gray-500 focus:outline-none ${
                          touched.name && errors.name
                            ? 'border-pink-500 ring-1 ring-pink-500/50'
                            : touched.name && !errors.name
                            ? 'border-emerald-500/60 focus:border-emerald-400'
                            : 'border-white/10 hover:border-white/25 focus:border-[#3F5EFB] focus:ring-2 focus:ring-[#3F5EFB]/30'
                        }`}
                      />
                    </div>
                    {touched.name && errors.name && (
                      <p
                        id={`${idPrefix}-name-error`}
                        role="alert"
                        className="mt-1.5 text-xs text-pink-400 font-medium flex items-center gap-1 animate-fadeIn"
                      >
                        <HiExclamationCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <label
                      htmlFor={`${idPrefix}-email`}
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5"
                    >
                      Email Address <span className="text-pink-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id={`${idPrefix}-email`}
                        name="email"
                        type="email"
                        value={values.email}
                        onChange={handleChange('email')}
                        onBlur={handleBlur('email')}
                        aria-invalid={touched.email && !!errors.email}
                        aria-describedby={touched.email && errors.email ? `${idPrefix}-email-error` : undefined}
                        placeholder="john@example.com"
                        className={`w-full px-4 py-2.5 text-sm text-white rounded-xl bg-[#0b0826]/80 border transition-all duration-200 placeholder-gray-500 focus:outline-none ${
                          touched.email && errors.email
                            ? 'border-pink-500 ring-1 ring-pink-500/50'
                            : touched.email && !errors.email
                            ? 'border-emerald-500/60 focus:border-emerald-400'
                            : 'border-white/10 hover:border-white/25 focus:border-[#3F5EFB] focus:ring-2 focus:ring-[#3F5EFB]/30'
                        }`}
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p
                        id={`${idPrefix}-email-error`}
                        role="alert"
                        className="mt-1.5 text-xs text-pink-400 font-medium flex items-center gap-1 animate-fadeIn"
                      >
                        <HiExclamationCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor={`${idPrefix}-subject`}
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id={`${idPrefix}-subject`}
                      name="subject"
                      type="text"
                      value={values.subject}
                      onChange={handleChange('subject')}
                      placeholder="Project Inquiry / Hiring Squad"
                      className="w-full px-4 py-2.5 text-sm text-white rounded-xl bg-[#0b0826]/80 border border-white/10 hover:border-white/25 focus:border-[#3F5EFB] focus:ring-2 focus:ring-[#3F5EFB]/30 transition-all duration-200 placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor={`${idPrefix}-message`}
                      className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5"
                    >
                      Message <span className="text-pink-500">*</span>
                    </label>
                    <textarea
                      id={`${idPrefix}-message`}
                      name="message"
                      rows={5}
                      value={values.message}
                      onChange={handleChange('message')}
                      onBlur={handleBlur('message')}
                      aria-invalid={touched.message && !!errors.message}
                      aria-describedby={touched.message && errors.message ? `${idPrefix}-message-error` : undefined}
                      placeholder="Tell us about your project requirements, scope, and timeline..."
                      className={`w-full px-4 py-3 text-sm text-white rounded-xl bg-[#0b0826]/80 border transition-all duration-200 placeholder-gray-500 focus:outline-none resize-y ${
                        touched.message && errors.message
                          ? 'border-pink-500 ring-1 ring-pink-500/50'
                          : touched.message && !errors.message
                          ? 'border-emerald-500/60 focus:border-emerald-400'
                          : 'border-white/10 hover:border-white/25 focus:border-[#3F5EFB] focus:ring-2 focus:ring-[#3F5EFB]/30'
                      }`}
                    />
                    {touched.message && errors.message && (
                      <p
                        id={`${idPrefix}-message-error`}
                        role="alert"
                        className="mt-1.5 text-xs text-pink-400 font-medium flex items-center gap-1 animate-fadeIn"
                      >
                        <HiExclamationCircle className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`
                      w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold text-sm text-white
                      transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400
                      ${
                        isSubmitting
                          ? 'bg-purple-800 opacity-75 cursor-not-allowed'
                          : 'bg-[#6318F1] hover:bg-gradient-to-r hover:from-[#FC466B] hover:to-[#3F5EFB] hover:scale-105 active:scale-95'
                      }
                    `}
                  >
                    {isSubmitting ? (
                      <>
                        <CgSpinner className="w-4 h-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>

                  <span className="text-xs text-gray-400">
                    Fields marked with <span className="text-pink-500">*</span> are required
                  </span>
                </div>
              </form>
            )}
          </section>
        </div>

        <div className="lg:w-[28%] flex flex-col items-center justify-between mt-10 lg:mt-0 p-8 rounded-2xl bg-[#0F0B2A]/90 border border-white/10 shadow-xl">
          <div className="flex flex-col items-center text-center py-4 w-full">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center mb-3">
              <FaPhoneAlt size={22} className="text-blue-400" />
            </div>
            <div className="text-white text-base font-semibold">Phone</div>
            <div className="text-gray-300 text-sm mt-1 font-mono">+1 (555) 234-5678</div>
          </div>

          <hr className="w-4/5 my-2 border-0 bg-gradient-to-r h-[1px] from-[#FC466B] to-[#3F5EFB]" />

          <div className="flex flex-col items-center text-center py-4 w-full">
            <div className="w-14 h-14 rounded-2xl bg-purple-600/15 border border-purple-500/30 flex items-center justify-center mb-3">
              <MdMarkEmailUnread size={26} className="text-purple-400" />
            </div>
            <div className="text-white text-base font-semibold">Email</div>
            <div className="text-gray-300 text-sm mt-1 font-mono">contact@accurasofthire.com</div>
          </div>

          <hr className="w-4/5 my-2 border-0 bg-gradient-to-r h-[1px] from-[#FC466B] to-[#3F5EFB]" />

          <div className="flex flex-col items-center text-center py-4 w-full">
            <div className="w-14 h-14 rounded-2xl bg-pink-600/15 border border-pink-500/30 flex items-center justify-center mb-3">
              <FaLocationDot size={22} className="text-pink-400" />
            </div>
            <div className="text-white text-base font-semibold">Location</div>
            <div className="text-gray-300 text-sm mt-1">Silicon Valley, CA & Remote Global</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;