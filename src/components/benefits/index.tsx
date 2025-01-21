type Benefit = {
  name: string;
  description: string;
  icon: React.ElementType;
}

type Props = {
  benefits: Benefit[];
}

export const Benefits = (props: Props) => {
  return props.benefits.map((benefit) => (
    <div key={benefit.name} className="flex flex-col bg-white shadow-lg rounded-xl p-6 transform transition-all hover:scale-105 hover:shadow-xl hover:border-indigo-500 border-2 border-transparent">
      <div className="flex items-center gap-x-4 text-lg font-semibold text-gray-900">
        <benefit.icon className="h-8 w-8 text-indigo-600" aria-hidden="true" />
        <span>{benefit.name}</span>
      </div>
      <div className="mt-4 text-base text-gray-600">
        <p>{benefit.description}</p>
      </div>
    </div>
  ));
}