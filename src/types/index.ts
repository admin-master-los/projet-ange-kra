export interface FormData {
  [sectionId: number]: any;
}

export interface Section {
  id: number;
  title: string;
  component: React.ComponentType<SectionProps>;
}

export interface SectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

export interface Section1Data {
  problemDescription: string;
  targets: string[];
  personas: Persona[];
  successMetrics: SuccessMetric[];
}

export interface Persona {
  name: string;
  age: string;
  currentSituation: string;
  problem: string;
  seeking: string;
}

export interface SuccessMetric {
  type: string;
  value: string;
  checked: boolean;
}