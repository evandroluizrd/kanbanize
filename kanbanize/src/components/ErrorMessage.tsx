type ErrorMessageProps = {
    message: string;
  };
  
  export default function ErrorMessage({ message }: ErrorMessageProps) {
    if (!message) return null;
  
    return <p className="text-red-500 text-sm mb-3">{message}</p>;
  }
  