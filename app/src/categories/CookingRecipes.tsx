import React, { useState } from 'react'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { generateVideoAnalysis } from 'wasp/client/operations'
import { useNavigate } from 'react-router-dom'

type SocialPlatform = 'instagram' | 'facebook' | 'youtube' | 'tiktok' | null

interface ValidationResult {
    isValid: boolean
    platform: SocialPlatform
    error?: string
}

const CookingRecipes = () => {
    const [url, setUrl] = useState('')
    const [validation, setValidation] = useState<ValidationResult>({ isValid: false, platform: null })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const validateUrl = (inputUrl: string): ValidationResult => {
        if (!inputUrl.trim()) {
            return { isValid: false, platform: null, error: 'Please enter a URL' }
        }

        try {
            const urlObj = new URL(inputUrl)
            const hostname = urlObj.hostname.toLowerCase()

            // Check for supported platforms
            if (hostname.includes('instagram.com') || hostname.includes('instagr.am')) {
                return { isValid: true, platform: 'instagram' }
            } else if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
                return { isValid: true, platform: 'facebook' }
            } else if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
                return { isValid: true, platform: 'youtube' }
            } else if (hostname.includes('tiktok.com')) {
                return { isValid: true, platform: 'tiktok' }
            } else {
                return {
                    isValid: false,
                    platform: null,
                    error: 'Please enter a valid Instagram, Facebook, YouTube, or TikTok URL'
                }
            }
        } catch {
            return { isValid: false, platform: null, error: 'Please enter a valid URL' }
        }
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputUrl = e.target.value
        setUrl(inputUrl)
        setValidation(validateUrl(inputUrl))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validation.isValid || !validation.platform) return

        setIsSubmitting(true)
        setError(null)

        try {
            const response = await generateVideoAnalysis({
                videoUrl: url,
                platform: validation.platform,
                type: 'cooking'
            })

            if (response) {
                navigate(`/categories/video-analysis/${response.id}`)
            } else {
                setError('Failed to analyze the video. Please try again.')
            }
        } catch (err) {
            console.error('Error analyzing video:', err)
            setError('An error occurred while analyzing the video. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const getSocialMediaIcon = (platform: SocialPlatform) => {
        switch (platform) {
            case 'instagram':
                return (
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </div>
                )
            case 'facebook':
                return (
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </div>
                )
            case 'youtube':
                return (
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </div>
                )
            case 'tiktok':
                return (
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                        </svg>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12 mt-8">
                    <h1 className="text-5xl font-bold text-gradient-primary mb-6">
                        Cooking Recipe Analyzer
                    </h1>
                    <p className="text-xl text-muted-foreground mb-4">
                        Transform cooking videos into step-by-step recipes
                    </p>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Simply paste a link from Instagram, Facebook, YouTube, or TikTok and we'll extract the recipe for you
                    </p>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-8">
                        <Card className="border-destructive">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3">
                                    <svg className="w-6 h-6 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-destructive">Analysis Failed</h3>
                                        <p className="text-sm text-muted-foreground mt-1">{error}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Main CTA Card */}
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-2xl">
                        <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* URL Input Section */}
                                    <div className="space-y-2">
                                        <Label htmlFor="url" className="text-lg font-medium">
                                            Video URL
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="url"
                                                type="url"
                                                value={url}
                                                onChange={handleUrlChange}
                                                placeholder="https://www.instagram.com/p/..."
                                                className={`text-lg py-3 pr-12 ${url && !validation.isValid
                                                    ? 'border-destructive focus-visible:ring-destructive'
                                                    : validation.isValid
                                                        ? 'border-green-500 focus-visible:ring-green-500'
                                                        : ''
                                                    }`}
                                            />
                                            {/* Platform Icon */}
                                            {validation.platform && (
                                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                                    {getSocialMediaIcon(validation.platform)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Validation Messages */}
                                        {validation.error && (
                                            <p className="text-sm text-destructive mt-2">
                                                {validation.error}
                                            </p>
                                        )}
                                        {validation.isValid && validation.platform && (
                                            <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Valid {validation.platform.charAt(0).toUpperCase() + validation.platform.slice(1)} URL detected
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={!validation.isValid || isSubmitting}
                                        className="w-full text-lg py-6 relative overflow-hidden group"
                                    >
                                        <span className="relative z-10">
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Analyzing Recipe...
                                                </>
                                            ) : (
                                                'Analyze Recipe'
                                            )}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Button>
                                </form>

                                {/* Supported Platforms */}
                                <div className="mt-8 pt-6 border-t border-border/50">
                                    <p className="text-sm text-muted-foreground text-center mb-4">
                                        Supported platforms:
                                    </p>
                                    <div className="flex justify-center gap-4">
                                        {getSocialMediaIcon('instagram')}
                                        {getSocialMediaIcon('facebook')}
                                        {getSocialMediaIcon('youtube')}
                                        {getSocialMediaIcon('tiktok')}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Features */}
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                                <p className="text-sm text-muted-foreground">Extract recipes in seconds</p>
                            </div>
                            <div>
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold mb-2">AI Powered</h3>
                                <p className="text-sm text-muted-foreground">Smart ingredient recognition</p>
                            </div>
                            <div>
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold mb-2">Recipe Ready</h3>
                                <p className="text-sm text-muted-foreground">Formatted for easy cooking</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CookingRecipes