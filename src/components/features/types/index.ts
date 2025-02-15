import { StaticImageData } from "next/image";

export type CardProps = {
  title: string;
  description: string;
  image: StaticImageData;
}

export type FeatureProps = {
  title: string;
  description: string;
}

export type Keys = 'clients' | 'lawyers';