import { Benefits } from "../benefits";

type Benefit = {
  name: string;
  description: string;
  icon: React.ElementType;
}

type Props = {
  miniTitle: string;
  title: string;
  description: string;
  benefits: Benefit[];
}

export default function BenefitsSession(props: Props) {
  const renderBenefits = () => <Benefits benefits={props.benefits} />

  return (
    <div id="benefits" className="bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto px-6 lg:px-8">
        <div className="text-center mx-auto max-w-2xl lg:max-w-4xl">
          {/* Mini título e título */}
          <h2 className="text-base font-semibold text-indigo-600 uppercase tracking-wide">
            {props.miniTitle}
          </h2>
          <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            {props.title}
          </p>
          <p className="mt-4 text-lg text-gray-600">
            {props.description}
          </p>
        </div>

        {/* Grid de Benefits com 4 colunas e espaçamento de 16px (gap-4) */}
        <div className="mx-auto mt-6 sm:mt-8 lg:mt-8">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {renderBenefits()}
          </dl>
        </div>
      </div>
    </div>
  )
}
