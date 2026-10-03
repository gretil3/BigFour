import {
  getFirstName,
  getMemberBySlug,
  services as allServices,
  type Service,
} from '@bigfour/shared';
import { formatIndex } from '../lib/format';
import styles from './ServiceCard.module.css';

export function ServiceCard({ service }: { service: Service }) {
  const lead = getMemberBySlug(service.lead);

  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.number}>{formatIndex(allServices.indexOf(service) + 1)}</span>
        {lead && <span className={styles.lead}>Lead · {getFirstName(lead)}</span>}
      </div>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.description}>{service.description}</p>
      <ul className={styles.tools}>
        {service.tools.map((tool) => (
          <li key={tool} className={styles.tool}>
            {tool}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className={styles.grid}>
      {services.map((service) => (
        <ServiceCard key={service.title} service={service} />
      ))}
    </div>
  );
}
