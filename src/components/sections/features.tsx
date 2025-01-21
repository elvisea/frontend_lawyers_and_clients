import { ListFeatures } from "../features";

type Features = {
  name: string;
  description: string;
  icon: React.ElementType;
}

type Props = {
  miniTitle: string;
  title: string;
  description: string;
  features: Features[]
}

export default function Features(props: Props) {

  const renderFeatures = () => <ListFeatures features={props.features} />

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">{props.miniTitle}</h2>
          <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
            {props.title}
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            {props.description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {renderFeatures()}
          </dl>
        </div>
      </div>
    </div>
  )
}
