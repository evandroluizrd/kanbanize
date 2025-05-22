type FormButtonProps = {
    label: string;
  };
  
  export default function FormButton({ label }: FormButtonProps) {
    return (
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {label}
      </button>
    );
  }
  