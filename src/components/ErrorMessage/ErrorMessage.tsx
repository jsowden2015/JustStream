interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="text-center py-8">
      <div className="text-4xl mb-4">⚠️</div>
      <p className="text-gray-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  )
}

export default ErrorMessage

