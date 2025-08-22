import React from 'react'
import { Card } from '../components/ui/card'

const categories = [
  {
    id: 1,
    name: 'Cooking Recipes',
    description: 'Analyze and discover amazing cooking recipes',
    path: '/categories/cooking-recipes',
    imgUrl: 'https://media.tenor.com/n8DB4bmpduIAAAAM/yeah-bwoi-grin.gif'
  },
  {
    id: 2,
    name: 'Face Masks',
    description: 'Explore skincare and beauty treatments',
    path: '/categories/face-masks',
    imgUrl: 'https://media.tenor.com/PNNvKVlsU-wAAAAM/spa-day.gif'
  },
  {
    id: 3,
    name: 'DIY Projects',
    description: 'Creative do-it-yourself project ideas',
    path: '/categories/diy-projects',
    imgUrl: 'https://i.pinimg.com/originals/46/7b/40/467b400d81c2171d65c3063826328895.gif'
  }
]

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient-primary mb-4">
            Explore Categories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing tools and features organized by category. Click on any card to explore what's inside.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <a 
              key={category.id} 
              href={category.path}
              className="group block transform transition-all duration-300 hover:scale-105"
            >
              <Card className="relative h-80 overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-card/80">
                {/* Background Image with Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.imgUrl})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                
                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                  <div className="transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-foreground transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      {category.description}
                    </p>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {/* Animated border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl transition-all duration-300" />
              </Card>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage