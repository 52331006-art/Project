import { FaSeedling, FaBookOpen, FaHandsHelping } from 'react-icons/fa'
import team from '../data/team.js'
import { useMenu } from '../context/MenuContext.js'

const FOUNDED = 2012

const values = [
  {
    Icon: FaBookOpen,
    title: 'Family Recipes',
    text: 'Every dish starts from a recipe passed down in our family, cooked the slow, proper way.',
  },
  {
    Icon: FaSeedling,
    title: 'Local Produce',
    text: 'We buy from farmers in the Bekaa and the mountains, so what you eat is fresh and in season.',
  },
  {
    Icon: FaHandsHelping,
    title: 'Warm Hospitality',
    text: 'Guests are family here. Expect a smile, a full table and a coffee on the house now and then.',
  },
]

// "Rami Haddad" -> "RH", used for the team avatars.
const initials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')

function About() {
  const { dishes } = useMenu()

  const stats = [
    { value: new Date().getFullYear() - FOUNDED, label: 'Years in Hamra' },
    { value: dishes.length, label: 'Dishes on the menu' },
    { value: '50k+', label: 'Happy guests' },
    { value: '4.8', label: 'Average rating' },
  ]

  return (
    <>
      <section className="page-header text-center">
        <div className="container">
          <p className="eyebrow">About us</p>
          <h1>Our Story</h1>
          <p className="lead mb-0">A small family kitchen that grew into a Hamra favourite.</p>
        </div>
      </section>

      <section className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <div className="section-heading">
              <p className="eyebrow">Since {FOUNDED}</p>
              <h2 className="mb-4">From a Family Kitchen to Hamra Street</h2>
            </div>
            <p>
              RestoApp started in {FOUNDED} with six tables, one charcoal grill and our
              grandmother&apos;s recipe book. We wanted to cook the food we grew up with: simple,
              generous and full of flavour.
            </p>
            <p>
              Over the years the tables multiplied, but the kitchen hasn&apos;t changed much. The
              hummus is still made fresh each morning, the bread still comes straight from the
              oven, and every skewer is still marinated overnight.
            </p>
            <p className="mb-0">
              Whether you join us for a long Sunday lunch or order a quick shawarma to your desk,
              we cook it like we&apos;re cooking for family.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="about-img-wrap">
              <img
                src="/images/mezze-platter.jpg"
                className="about-img"
                alt="A mezze platter with hummus, baba ghanouj and labneh"
              />
              <span className="about-badge">Since {FOUNDED}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band py-5">
        <div className="container">
          <div className="row row-cols-2 row-cols-md-4 g-4 text-center">
            {stats.map(({ value, label }) => (
              <div className="col" key={label}>
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="section-heading text-center mb-5">
          <p className="eyebrow">What we believe</p>
          <h2>Our Values</h2>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {values.map(({ Icon, title, text }) => (
            <div className="col" key={title}>
              <div className="card info-card h-100 p-4 text-center">
                <div className="feature-icon mx-auto mb-3">
                  <Icon />
                </div>
                <h5>{title}</h5>
                <p className="text-body-secondary mb-0">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-alt py-5">
        <div className="container">
          <div className="section-heading text-center mb-5">
            <p className="eyebrow">The people behind the food</p>
            <h2>Meet the Team</h2>
          </div>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
            {team.map((member) => (
              <div className="col" key={member.id}>
                <div className="card info-card h-100 p-4 text-center">
                  <div className="team-avatar mx-auto mb-3" aria-hidden="true">
                    {initials(member.name)}
                  </div>
                  <h5 className="mb-1">{member.name}</h5>
                  <p className="team-role mb-2">{member.role}</p>
                  <p className="small text-body-secondary mb-0">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default About
