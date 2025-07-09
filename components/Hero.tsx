import { getCompanyInfo, getMediaImages } from '@/lib/cosmic'
import { MediaImage } from '@/types'

export default async function Hero() {
  const companyInfo = await getCompanyInfo()
  const mediaImages = await getMediaImages()

  if (!companyInfo) {
    return null
  }

  // Filter images to get good backgrounds for phone frames
  const backgroundImages = mediaImages.filter((img: MediaImage) => 
    img.name.includes('photo-') || img.name.includes('.jpg')
  ).slice(0, 2)

  // Fallback images if no media images are available
  const leftPhoneImage = backgroundImages[0]?.imgix_url || 
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=800&fit=crop&auto=format,compress'
  const rightPhoneImage = backgroundImages[1]?.imgix_url || 
    'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=800&fit=crop&auto=format,compress'

  return (
    <section className="pt-32 pb-20 section-padding bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
              <span className="text-gray-900">#1 Ranked US App</span>
              <br />
              <span className="text-gray-900">Development Agency</span>
              <span className="text-primary">.</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              We solve problems with strategy, creativity and technology. A lot of people have ideas, but don't have a clue. We can help.
            </p>
            
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-block bg-primary text-white px-12 py-4 rounded-md font-semibold text-lg hover:bg-primary/90 transition-colors"
              >
                LET'S TALK
              </a>
            </div>
          </div>

          {/* Phone Mockups */}
          <div className="relative">
            <div className="flex justify-center items-center space-x-6">
              {/* Left Phone - Dating App */}
              <div className="relative transform rotate-[-5deg] hover:rotate-0 transition-transform duration-300">
                <div className="relative w-56 h-[480px] bg-black rounded-[40px] p-2 shadow-2xl">
                  <div className="w-full h-full rounded-[32px] overflow-hidden relative">
                    {/* Dynamic background image */}
                    <img
                      src={`${leftPhoneImage}?w=400&h=800&fit=crop&auto=format,compress`}
                      alt="App background"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 to-pink-600/80"></div>
                    <div className="absolute inset-0 bg-black/30"></div>
                    
                    <div className="absolute top-8 left-6 text-white z-10">
                      <h3 className="text-2xl font-bold">BOOM!</h3>
                      <p className="text-sm opacity-90">Dating Made Simple</p>
                    </div>
                    <div className="absolute bottom-20 left-6 right-6 z-10">
                      <div className="flex space-x-3">
                        <div className="w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm"></div>
                        <div className="w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Phone - Analytics Dashboard */}
              <div className="relative transform rotate-[5deg] hover:rotate-0 transition-transform duration-300">
                <div className="relative w-56 h-[480px] bg-black rounded-[40px] p-2 shadow-2xl">
                  <div className="w-full h-full rounded-[32px] overflow-hidden relative">
                    {/* Dynamic background image */}
                    <img
                      src={`${rightPhoneImage}?w=400&h=800&fit=crop&auto=format,compress`}
                      alt="App background"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gray-900/90"></div>
                    
                    <div className="absolute top-8 left-6 right-6 z-10">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">Analytics</p>
                            <p className="text-xs opacity-70">Dashboard</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">2</p>
                          <p className="text-xs opacity-70">Active</p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-20 left-6 right-6 z-10">
                      <div className="w-full h-32 bg-green-500/20 rounded-2xl backdrop-blur-sm border border-green-500/30 flex items-center justify-center">
                        <div className="w-20 h-20 bg-green-500 rounded-full opacity-80"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}