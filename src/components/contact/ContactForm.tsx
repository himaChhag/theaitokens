"use client";

import { useForm, ValidationError } from "@formspree/react";
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xkovpojy");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please complete the reCAPTCHA verification");
      return;
    }

    await handleSubmit(e);

    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
      setCaptchaValue(null);
    }
  };

  if (state.succeeded) {
    return (
      <div style={{
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        borderRadius: '8px',
        padding: '32px',
        textAlign: 'center'
      }}>
        <div style={{ color: '#16a34a', fontSize: '48px', marginBottom: '16px' }}>✓</div>
        <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#15803d', marginBottom: '8px' }}>
          Message Sent Successfully!
        </h3>
        <p style={{ color: '#166534', marginBottom: '16px' }}>
          Thank you for contacting us. We'll get back to you within 24-48 hours.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '8px 24px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      padding: '32px'
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>
        Send us a Message
      </h2>

      <form onSubmit={onSubmit}>
        {/* Name Field */}
        <div style={{ marginBottom: '32px' }}>
          <label
            htmlFor="name"
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px'
            }}
          >
            Name <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              backgroundColor: 'white',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
            placeholder="Your full name"
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
          <ValidationError
            prefix="Name"
            field="name"
            errors={state.errors}
            style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px', display: 'block' }}
          />
        </div>

        {/* Email Field */}
        <div style={{ marginBottom: '32px' }}>
          <label
            htmlFor="email"
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px'
            }}
          >
            Email <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              backgroundColor: 'white',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
            placeholder="your.email@example.com"
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px', display: 'block' }}
          />
        </div>

        {/* Subject Field */}
        <div style={{ marginBottom: '32px' }}>
          <label
            htmlFor="subject"
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px'
            }}
          >
            Subject <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              backgroundColor: 'white',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="">Select a topic</option>
            <option value="Token Counting Question">Token Counting Question</option>
            <option value="Pricing Information">Pricing Information</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Partnership Inquiry">Partnership Inquiry</option>
            <option value="General Question">General Question</option>
            <option value="Other">Other</option>
          </select>
          <ValidationError
            prefix="Subject"
            field="subject"
            errors={state.errors}
            style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px', display: 'block' }}
          />
        </div>

        {/* Message Field */}
        <div style={{ marginBottom: '32px' }}>
          <label
            htmlFor="message"
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '12px'
            }}
          >
            Message <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={6}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              backgroundColor: 'white',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
            placeholder="Please describe your question or feedback in detail..."
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px', display: 'block' }}
          />
        </div>

        {/* reCAPTCHA */}
        <div style={{ marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px'
          }}>
            Security Verification <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <div style={{ marginBottom: '8px' }}>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={
                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ||
                "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              }
              onChange={handleCaptchaChange}
              theme="light"
              size="normal"
            />
          </div>
          {!captchaValue && (
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px' }}>
              Please complete the reCAPTCHA verification to send your message.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div style={{ paddingTop: '16px' }}>
          <button
            type="submit"
            disabled={state.submitting || !captchaValue}
            style={{
              width: '100%',
              backgroundColor: !captchaValue || state.submitting ? '#9ca3af' : '#2563eb',
              color: 'white',
              padding: '16px 24px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: '600',
              border: 'none',
              cursor: !captchaValue || state.submitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              if (!state.submitting && captchaValue) {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
              }
            }}
            onMouseOut={(e) => {
              if (!state.submitting && captchaValue) {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }
            }}
          >
            {state.submitting ? (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <svg
                  style={{
                    animation: 'spin 1s linear infinite',
                    marginRight: '12px',
                    width: '20px',
                    height: '20px'
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    style={{ opacity: 0.25 }}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    style={{ opacity: 0.75 }}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending Message...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
          {!captchaValue && (
            <p style={{
              color: '#ef4444',
              fontSize: '14px',
              marginTop: '12px',
              textAlign: 'center'
            }}>
              Please complete the reCAPTCHA verification before submitting.
            </p>
          )}
        </div>

        {/* Error Display */}
        {state.errors && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '16px',
            marginTop: '16px'
          }}>
            <p style={{ color: '#dc2626', fontWeight: '500' }}>
              Please fix the following errors and try again.
            </p>
          </div>
        )}
      </form>

      <div style={{
        marginTop: '24px',
        paddingTop: '24px',
        borderTop: '1px solid #e5e7eb'
      }}>
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          <strong>Privacy Note:</strong> Your information will only be used to
          respond to your inquiry. We don't store or share your contact details
          with third parties. The reCAPTCHA helps us prevent spam.
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}