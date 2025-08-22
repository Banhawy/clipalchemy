import React, { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { getVideoAnalysisResultById, useQuery } from 'wasp/client/operations'

interface AnalysisResultProps {
  id?: string
}

const VideoAnalysisPage: React.FC<AnalysisResultProps> = ({ id }) => {
  // get id from url path
  const urlPath = window.location.pathname
  const videoIdFromUrl = urlPath.split('/').pop()
  let videoId = ''
  if (videoIdFromUrl && videoIdFromUrl !== 'video-analysis') {
    videoId = videoIdFromUrl
  } else if (id) {
    videoId = id
  }
  const [displayedText, setDisplayedText] = useState('')
  const [isStreaming, setIsStreaming] = useState(true)
  const { data: analysisResult, isLoading, error } = useQuery(getVideoAnalysisResultById, { id: videoId })

  // Streaming effect hook
  useEffect(() => {
    if (!analysisResult || !isStreaming) return

    let currentIndex = 0
    const fullText = analysisResult.output
    
    const streamInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsStreaming(false)
        clearInterval(streamInterval)
      }
    }, 10) // Adjust speed here (lower = faster)

    return () => clearInterval(streamInterval)
  }, [analysisResult, isStreaming])

  // Loading state
  if (isLoading) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gradient-primary">
            Recipe Analysis
          </h1>
          <Button 
            variant="outline" 
            onClick={() => history.back()}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Loading Video Info Card */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-lg">Video Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video rounded-lg bg-muted animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-1/2 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Loading Recipe Content */}
          <div className="lg:col-span-2">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Loading recipe...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-4/6 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gradient-primary">
            Recipe Analysis
          </h1>
          <Button 
            variant="outline" 
            onClick={() => history.back()}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Button>
        </div>
        
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Unable to Load Analysis</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {error.message || 'Something went wrong while loading the recipe analysis.'}
                </p>
              </div>
              <Button 
                onClick={() => window.location.reload()}
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Success state - existing content
  if (!analysisResult) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gradient-primary">
            Recipe Analysis
          </h1>
          <Button 
            variant="outline" 
            onClick={() => history.back()}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Button>
        </div>
        
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Analysis Not Found</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  The requested analysis could not be found or may have been deleted.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="my-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gradient-primary">
          Recipe Analysis
        </h1>
        <Button 
          variant="outline" 
          onClick={() => history.back()}
          className="flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Analyze Another Video
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video Info Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-lg">Video Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysisResult.thumbnailUrl && (
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <img 
                    src={analysisResult.thumbnailUrl} 
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
              <div>
                <h3 className="font-semibold mb-2">{analysisResult.title}</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><span className="font-medium">Platform:</span> {analysisResult.platform && (analysisResult.platform.charAt(0).toUpperCase() + analysisResult.platform.slice(1))}</p>
                  <p><span className="font-medium">Analyzed:</span> {new Date(analysisResult.createdAt).toLocaleString()}</p>
                  {analysisResult.socialMediaUrl && (
                      <p>
                          <span className="font-medium">Source:</span>{' '}
                          <a 
                              href={analysisResult.socialMediaUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary hover:underline break-all"
                          >
                              {analysisResult.socialMediaUrl.length > 40 
                                  ? `${analysisResult.socialMediaUrl.substring(0, 40)}...` 
                                  : analysisResult.socialMediaUrl
                              }
                          </a>
                      </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Preview Card */}
          {analysisResult.videoUrl && (
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M6 10h2m3 6h7m-3-3h3m-6 0h.01" />
                  </svg>
                  Video Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 rounded-lg overflow-hidden bg-black">
                  <video 
                    src={analysisResult.videoUrl}
                    controls
                    preload="metadata"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      console.error('Video failed to load:', analysisResult.videoUrl);
                      e.currentTarget.style.display = 'none';
                      // Show fallback message
                      const fallback = e.currentTarget.parentElement?.querySelector('.video-fallback');
                      if (fallback) {
                        (fallback as HTMLElement).style.display = 'flex';
                      }
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                  {/* Fallback message for when video fails to load */}
                  <div className="video-fallback hidden w-full h-full items-center justify-center bg-muted rounded-lg">
                    <div className="text-center text-muted-foreground">
                      <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium">Video Preview Unavailable</p>
                      <p className="text-xs">The processed video could not be loaded</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recipe Content */}
        <div className="lg:col-span-2">
          <Card className="h-fit">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recipe</CardTitle>
              {isStreaming && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Generating recipe...
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div 
                  className="whitespace-pre-wrap text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: displayedText.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')
                  }}
                />
                {isStreaming && (
                  <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1"></span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default VideoAnalysisPage
