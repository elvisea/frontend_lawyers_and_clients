import { ListBenefits } from "../benefit";

type Benefit = {
  name: string;
  description: string;
  icon: React.ElementType;
}

type Props = {
  miniTitle: string;
  title: string;
  description: string;
  benefits: Benefit[]
}

export default function Benefits(props: Props) {

  const renderBenefits = () => <ListBenefits benefits={props.benefits} />

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {props.miniTitle}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {props.title}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {props.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {renderBenefits()}
          </dl>
        </div>
      </div>
    </div>
  )
}
