interface FormSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
      <h2 className="text-xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="text-slate-500 mt-1 mb-8">
        {description}
      </p>

      {children}
    </div>
  );
}