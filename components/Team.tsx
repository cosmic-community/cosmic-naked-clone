import { getTeamMembers } from '@/lib/cosmic'
import { TeamMember } from '@/types'

export default async function Team() {
  const teamMembers = await getTeamMembers()

  return (
    <section id="team" className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="text-secondary">Meet the</span>
            <span className="text-primary"> leaders</span>
            <span className="text-secondary">.</span>
          </h2>
          <p className="section-subtitle">
            Just your neighborhood forward-thinking visionaries. Wearing nothing (but smiles).
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member: TeamMember, index: number) => (
            <div key={member.id} className="group">
              <div className="relative overflow-hidden rounded-lg shadow-lg mb-4">
                {(member.metadata.photo || member.metadata.image) ? (
                  <img
                    src={`${(member.metadata.photo || member.metadata.image).imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                    alt={member.metadata.name || member.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-6xl">👤</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">
                      {member.metadata.name || member.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      {member.metadata.job_title || member.metadata.position}
                    </p>
                    {member.metadata.location && (
                      <p className="text-gray-300 text-sm">
                        📍 {member.metadata.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-bold text-secondary mb-1">
                  {member.metadata.name || member.title}
                </h3>
                <p className="text-primary text-sm mb-2">
                  {member.metadata.job_title || member.metadata.position}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.metadata.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}