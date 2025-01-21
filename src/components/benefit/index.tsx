type Benefit = {
  name: string;
  description: string;
  icon: React.ElementType;
}

type Props = {
  benefits: Benefit[]
}

export const ListBenefits = (props: Props) => {
  return props.benefits.map((benefit) => (
    <div key={benefit.name} className="flex flex-col bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
        <benefit.icon className="h-7 w-7 flex-none text-indigo-600" aria-hidden="true" />
        {benefit.name}
      </div>
      <div className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
        <p className="flex-auto">{benefit.description}</p>
      </div>
    </div>
  ))
}