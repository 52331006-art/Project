import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaRegClock,
  FaPaperPlane,
} from 'react-icons/fa'
import { contact, socials } from '../data/restaurant.js'

const details = [
  { Icon: FaMapMarkerAlt, label: 'Address', value: contact.address },
  {
    Icon: FaPhoneAlt,
    label: 'Phone',
    value: contact.phone,
    href: `tel:${contact.phone.replace(/\s/g, '')}`,
  },
  { Icon: FaEnvelope, label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { Icon: FaRegClock, label: 'Opening hours', value: contact.hours },
]

const subjects = ['Table reservation', 'Catering & events', 'Feedback', 'Other']

const emptyForm = { name: '', email: '', phone: '', subject: subjects[0], message: '' }

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`

function Contact() {
  const [form, setForm] = useState(emptyForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // There is no backend yet, so just pretend the message was sent.
    const firstName = form.name.trim().split(' ')[0]
    toast.success(`Thanks, ${firstName}! We'll get back to you soon.`)
    setForm(emptyForm)
  }

  return (
    <>
      <section className="page-header text-center">
        <div className="container">
          <p className="eyebrow">We&apos;d love to hear from you</p>
          <h1>Get in Touch</h1>
          <p className="lead mb-0">Book a table, plan an event or just say hello.</p>
        </div>
      </section>

      <section className="container py-5">
        <div className="row g-5">
          <div className="col-lg-5">
            <h2 className="mb-4">Contact Details</h2>
            <ul className="list-unstyled mb-4">
              {details.map(({ Icon, label, value, href }) => (
                <li className="contact-detail" key={label}>
                  <span className="contact-icon">
                    <Icon />
                  </span>
                  <div>
                    <span className="contact-label">{label}</span>
                    {href ? <a href={href}>{value}</a> : <span>{value}</span>}
                  </div>
                </li>
              ))}
            </ul>

            <h5 className="mb-3">Follow us</h5>
            <div className="contact-social d-flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="col-lg-7">
            <div className="card info-card p-4 p-md-5">
              <h2 className="mb-4">Send Us a Message</h2>
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    id="name"
                    name="name"
                    className="form-control"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">
                    Phone <span className="text-body-secondary">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="form-control"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    className="form-select"
                    value={form.subject}
                    onChange={handleChange}
                  >
                    {subjects.map((subject) => (
                      <option key={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div className="col-12">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    rows="5"
                    required
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-brand btn-lg d-inline-flex align-items-center gap-2"
                  >
                    <FaPaperPlane />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <div className="map-wrap">
          <iframe
            src={mapSrc}
            title={`Map showing ${contact.address}`}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </>
  )
}

export default Contact
