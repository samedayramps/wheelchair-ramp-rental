# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "src/scripts/**/*.ts"],
  "exclude": ["node_modules"]
}
```

# tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;

```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# package.json

```json
{
  "name": "wheelchair-ramp-rental",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "init-pricing": "ts-node src/scripts/initPricingVariables.ts"
  },
  "dependencies": {
    "@next-auth/prisma-adapter": "^1.0.7",
    "@prisma/client": "^5.17.0",
    "bcrypt": "^5.1.1",
    "next": "14.2.5",
    "next-auth": "^4.24.7",
    "prisma": "^5.17.0",
    "react": "^18",
    "react-dom": "^18",
    "react-hook-form": "^7.45.4"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/google.maps": "^3.55.12",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "14.2.5",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "ts-node": "^10.9.2",
    "typescript": "^5.5.4"
  }
}

```

# next.config.mjs

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

```

# README.md

```md
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# .eslintrc.json

```json
{
  "extends": "next/core-web-vitals"
}

```

# .aidigestignore

```
node_modules

```

# public/vercel.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# prisma/schema.prisma

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Customer {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  phone     String?
  address   String
  notes     String?
  jobs      Job[]    // Add this line to create the reverse relation
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Job {
  id                String     @id @default(uuid())
  customerId        String
  customer          Customer   @relation(fields: [customerId], references: [id])
  status            String
  scheduledAt       DateTime
  address           String
  deliveryFee       Float
  installFee        Float
  monthlyRentalRate Float
  notes             String?
  components        Component[]
  createdAt         DateTime   @default(now())
  updatedAt         DateTime   @updatedAt
}

model Component {
  id       String   @id
  type     String
  size     String
  status   String   @default("AVAILABLE")
  location String   @default("Warehouse")
  jobs     Job[]
}

model PricingVariables {
  id                    Int     @id @default(1)
  trailerRentalCost     Float
  perMileCost           Float
  rentalRatePerFoot     Float
  installRatePerSection Float
  installRatePerLanding Float
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  password  String
  role      String?
  // other fields...
}
```

# prisma/dev.db

This is a binary file of the type: Binary

# src/scripts/initPricingVariables.ts

```ts
// src/scripts/initPricingVariables.ts

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function initPricingVariables() {
  const existingVariables = await prisma.pricingVariables.findFirst();

  if (!existingVariables) {
    await prisma.pricingVariables.create({
      data: {
        trailerRentalCost: 50, // Example value
        perMileCost: 2, // Example value
        rentalRatePerFoot: 5, // Example value
        installRatePerSection: 20, // Example value
        installRatePerLanding: 30, // Example value
      },
    });
    console.log('Pricing variables initialized');
  } else {
    console.log('Pricing variables already exist');
  }
}

initPricingVariables()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

# src/scripts/addSampleCustomers.ts

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addSampleCustomers() {
  const customerCount = await prisma.customer.count();

  if (customerCount === 0) {
    await prisma.customer.createMany({
      data: [
        {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890',
          address: '123 Main St, Anytown, USA',
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '0987654321',
          address: '456 Elm St, Othertown, USA',
        },
      ],
    });
    console.log('Sample customers added');
  } else {
    console.log('Customers already exist');
  }
}

addSampleCustomers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

# src/scripts/addSampleComponents.ts

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addSampleComponents() {
  const componentCount = await prisma.component.count();

  if (componentCount === 0) {
    await prisma.component.createMany({
      data: [
        { id: 'RS_4_01', type: 'RAMP', size: '4', status: 'AVAILABLE' },
        { id: 'RS_6_01', type: 'RAMP', size: '6', status: 'AVAILABLE' },
        { id: 'L_5x5_01', type: 'LANDING', size: '5x5', status: 'AVAILABLE' },
      ],
    });
    console.log('Sample components added');
  } else {
    console.log('Components already exist');
  }
}

addSampleComponents()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

# src/lib/prisma.ts

```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

# src/lib/constants.ts

```ts
export const JobStatus = {
  QUOTED: 'QUOTED',
  SCHEDULED: 'SCHEDULED',
  INSTALLED: 'INSTALLED',
  COMPLETED: 'COMPLETED',
} as const;

export const ComponentType = {
  RAMP: 'RAMP',
  LANDING: 'LANDING',
} as const;

export const ComponentStatus = {
  AVAILABLE: 'AVAILABLE',
  RESERVED: 'RESERVED',
  INSTALLED: 'INSTALLED',
  MAINTENANCE: 'MAINTENANCE',
} as const;

export const ComponentLocation = {
  WAREHOUSE: 'Warehouse',
  JOB_SITE: 'Job Site',
} as const;

export type JobStatus = typeof JobStatus[keyof typeof JobStatus];
export type ComponentType = typeof ComponentType[keyof typeof ComponentType];
export type ComponentStatus = typeof ComponentStatus[keyof typeof ComponentStatus];
export type ComponentLocation = typeof ComponentLocation[keyof typeof ComponentLocation];
```

# src/lib/auth.ts

```ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        if (!user) {
          return null;
        }
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
};
```

# src/components/UpcomingJobs.tsx

```tsx
import React from 'react';
import Link from 'next/link';
import { Job } from '@prisma/client';

interface UpcomingJobsProps {
  jobs: (Job & { customer: { name: string } })[];
}

const UpcomingJobs: React.FC<UpcomingJobsProps> = ({ jobs }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Upcoming Jobs</h2>
      {jobs.length === 0 ? (
        <p>No upcoming jobs scheduled.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="border-b pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{job.customer.name}</p>
                  <p className="text-sm text-gray-600">{job.address}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(job.scheduledAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <Link
                    href={`/jobs/${job.id}/edit`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/jobs/${job.id}/execute`}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Begin Job
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingJobs;
```

# src/components/PricingVariables.tsx

```tsx
import React, { useState } from 'react';

interface PricingVariables {
  id?: number;
  trailerRentalCost: number;
  perMileCost: number;
  rentalRatePerFoot: number;
  installRatePerSection: number;
  installRatePerLanding: number;
}

interface PricingVariablesProps {
  initialData: PricingVariables;
  onSave: (data: PricingVariables) => void;
}

export default function PricingVariables({ initialData, onSave }: PricingVariablesProps) {
  const [formData, setFormData] = useState<PricingVariables>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="trailerRentalCost" className="block text-sm font-medium text-gray-700">
          Trailer Rental Cost
        </label>
        <input
          type="number"
          id="trailerRentalCost"
          name="trailerRentalCost"
          value={formData.trailerRentalCost}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="perMileCost" className="block text-sm font-medium text-gray-700">
          Per Mile Cost
        </label>
        <input
          type="number"
          id="perMileCost"
          name="perMileCost"
          value={formData.perMileCost}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="rentalRatePerFoot" className="block text-sm font-medium text-gray-700">
          Rental Rate Per Foot
        </label>
        <input
          type="number"
          id="rentalRatePerFoot"
          name="rentalRatePerFoot"
          value={formData.rentalRatePerFoot}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="installRatePerSection" className="block text-sm font-medium text-gray-700">
          Install Rate Per Section
        </label>
        <input
          type="number"
          id="installRatePerSection"
          name="installRatePerSection"
          value={formData.installRatePerSection}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="installRatePerLanding" className="block text-sm font-medium text-gray-700">
          Install Rate Per Landing
        </label>
        <input
          type="number"
          id="installRatePerLanding"
          name="installRatePerLanding"
          value={formData.installRatePerLanding}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Pricing Variables
        </button>
      </div>
    </form>
  );
}
```

# src/components/JobForm.tsx

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { JobStatus } from '@/lib/constants';
import CustomerSelect from './CustomerSelect';
import ComponentSelect from './ComponentSelect';
import CalculatedFields from './CalculatedFields';

interface Component {
  id: string;
  type: string;
  size: string;
}

interface JobFormProps {
  initialData?: {
    customerId: string;
    status: string;
    scheduledAt: string;
    address: string;
    deliveryFee: number;
    installFee: number;
    monthlyRentalRate: number;
    notes: string;
    components: string[];
  };
  onSubmit: (data: {
    customerId: string;
    status: string;
    scheduledAt: string;
    address: string;
    deliveryFee: number;
    installFee: number;
    monthlyRentalRate: number;
    notes: string;
    components: string[];
  }) => Promise<void>;
  onDelete?: () => void;
  customers: { id: string; name: string; address: string }[];
  availableComponents: { id: string; type: string; size: string; status: string; location: string; }[];
  pricingVariables: {
    trailerRentalCost: number;
    perMileCost: number;
    rentalRatePerFoot: number;
    installRatePerSection: number;
    installRatePerLanding: number;
  };
}

export default function JobForm({ initialData, onSubmit, onDelete, customers, availableComponents, pricingVariables }: JobFormProps) {
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: initialData || {
      customerId: '',
      status: '',
      scheduledAt: '',
      address: '',
      deliveryFee: 0,
      installFee: 0,
      monthlyRentalRate: 0,
      notes: '',
      components: [],
    },
  });

  const watchedCustomerId = watch('customerId');
  const watchedComponents = watch('components');
  const watchedAddress = watch('address');

  const [availableComponentIds, setAvailableComponentIds] = useState<string[]>([]);

  useEffect(() => {
    const filteredComponents = availableComponents.filter(
      component => component.status === 'AVAILABLE' || watchedComponents.includes(component.id)
    );
    setAvailableComponentIds(filteredComponents.map(comp => comp.id));
  }, [availableComponents, watchedComponents]);

  useEffect(() => {
    if (watchedCustomerId) {
      const selectedCustomer = customers.find(c => c.id === watchedCustomerId);
      if (selectedCustomer) {
        setValue('address', selectedCustomer.address);
      }
    }
  }, [watchedCustomerId, customers, setValue]);

  const calculateFees = useCallback(async () => {
    if (watchedComponents.length === 0 || !watchedAddress) {
      setValue('deliveryFee', 0);
      setValue('installFee', 0);
      setValue('monthlyRentalRate', 0);
      return;
    }

    const components = watchedComponents;
    const address = watchedAddress;

    const totalLength = components.reduce((total, componentId) => {
      const component = availableComponents.find(c => c.id === componentId);
      return total + (component?.type === 'RAMP' ? parseInt(component.size) : 0);
    }, 0);

    const sections = components.filter(componentId => 
      availableComponents.find(c => c.id === componentId)?.type === 'RAMP'
    ).length;
    const landings = components.filter(componentId => 
      availableComponents.find(c => c.id === componentId)?.type === 'LANDING'
    ).length;

    const monthlyRentalRate = totalLength * pricingVariables.rentalRatePerFoot;
    const installFee = (sections * pricingVariables.installRatePerSection) + 
                       (landings * pricingVariables.installRatePerLanding);

    let deliveryFee = 0;
    try {
      const response = await fetch('/api/calculate-distance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin: '6008 Windridge Ln, Flower Mound, TX 75028', destination: address }),
      });
      if (!response.ok) {
        throw new Error('Failed to calculate distance');
      }
      const data = await response.json();
      deliveryFee = (data.distance * pricingVariables.perMileCost) + pricingVariables.trailerRentalCost;
    } catch (error) {
      console.error('Error calculating delivery fee:', error);
    }

    setValue('deliveryFee', deliveryFee);
    setValue('installFee', installFee);
    setValue('monthlyRentalRate', monthlyRentalRate);
  }, [watchedComponents, watchedAddress, availableComponents, pricingVariables, setValue]);

  useEffect(() => {
    if (watchedComponents.length > 0 && watchedAddress) {
      calculateFees();
    }
  }, [watchedComponents, watchedAddress, calculateFees]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      onDelete?.();
    }
  };

  const handleFormSubmit = (data: any) => {
    const formattedData = {
      ...data,
      scheduledAt: new Date(data.scheduledAt).toISOString(),
      deliveryFee: parseFloat(data.deliveryFee),
      installFee: parseFloat(data.installFee),
      monthlyRentalRate: parseFloat(data.monthlyRentalRate),
      components: data.components
    };
    console.log('Submitting job data:', formattedData);
    onSubmit(formattedData);
  };

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  };
  
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <CustomerSelect control={control} customers={customers} />
      
      <Controller
        name="status"
        control={control}
        rules={{ required: 'Status is required' }}
        render={({ field }) => (
          <select {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            <option value="">Select a status</option>
            {Object.values(JobStatus).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        )}
      />

      <Controller
        name="scheduledAt"
        control={control}
        rules={{ required: 'Scheduled date is required' }}
        render={({ field }) => (
          <input 
            type="datetime-local" 
            {...field} 
            value={field.value ? formatDateForInput(field.value) : ''}
            onChange={(e) => field.onChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
          />
        )}
      />

      <Controller
        name="address"
        control={control}
        rules={{ required: 'Address is required' }}
        render={({ field }) => (
          <input type="text" {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        )}
      />

      <ComponentSelect 
        control={control} 
        availableComponents={availableComponentIds}
        name="components"
      />

      <CalculatedFields control={control} />

      <Controller
        name="notes"
        control={control}
        render={({ field }) => (
          <textarea {...field} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
        )}
      />

      <div className="space-y-2">
        <button 
          type="submit" 
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Job
        </button>
        
        {onDelete && (
          <button 
            type="button" 
            onClick={handleDelete}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete Job
          </button>
        )}
      </div>
    </form>
  );
}
```

# src/components/CustomerSelect.tsx

```tsx
// src/components/CustomerSelect.tsx
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface CustomerSelectProps {
  control: Control<any>;
  customers: { id: string; name: string }[] | undefined;
}

export default function CustomerSelect({ control, customers }: CustomerSelectProps) {
  return (
    <Controller
      name="customerId"
      control={control}
      rules={{ required: 'Customer is required' }}
      render={({ field }) => (
        <select {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          <option value="">Select a customer</option>
          {Array.isArray(customers) && customers.map((customer) => (
            <option key={customer.id} value={customer.id}>{customer.name}</option>
          ))}
        </select>
      )}
    />
  );
}
```

# src/components/CustomerForm.tsx

```tsx
import React, { useState, useEffect, useRef } from 'react';

interface CustomerFormProps {
  initialData?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
  };
  onSubmit: (data: { name: string; email: string; phone: string; address: string; notes: string }) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function CustomerForm({ initialData, onSubmit }: CustomerFormProps) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });

  const autocompleteInput = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      const autocompleteInstance = new window.google.maps.places.Autocomplete(
        autocompleteInput.current as HTMLInputElement,
        { types: ['address'] }
      );
      setAutocomplete(autocompleteInstance);

      autocompleteInstance.addListener('place_changed', () => {
        const place = autocompleteInstance.getPlace();
        if (place.formatted_address) {
          setFormData(prevData => ({ ...prevData, address: place.formatted_address }));
        }
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          ref={autocompleteInput}
          value={formData.address}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Customer
        </button>
      </div>
    </form>
  );
}
```

# src/components/ComponentSelect.tsx

```tsx
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface ComponentSelectProps {
  control: Control<any>;
  availableComponents: string[]; // Changed to array of strings (component IDs)
  name: string;
}

export default function ComponentSelect({ control, availableComponents, name }: ComponentSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Components</label>
          <div className="grid grid-cols-3 gap-2">
            {availableComponents.map(componentId => (
              <label key={componentId} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={componentId}
                  checked={field.value.includes(componentId)}
                  onChange={(e) => {
                    const updatedValue = e.target.checked
                      ? [...field.value, componentId]
                      : field.value.filter((id: string) => id !== componentId);
                    field.onChange(updatedValue);
                  }}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-sm">{componentId}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    />
  );
}
```

# src/components/ComponentForm.tsx

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { ComponentType, ComponentStatus, ComponentLocation } from '@/lib/constants';

interface Component {
  id: string;
  type: string;
  size: string;
  status: string;
  location: string;
}

interface ComponentFormProps {
  initialData?: Component;
  onSubmit: (data: Component) => void;
}

export default function ComponentForm({ initialData, onSubmit }: ComponentFormProps) {
  const [formData, setFormData] = useState<Component>(initialData || {
    id: '',
    type: '',
    size: '',
    status: ComponentStatus.AVAILABLE,
    location: ComponentLocation.WAREHOUSE,
  });

  const generateId = useCallback(async () => {
    const prefix = formData.type === ComponentType.RAMP ? 'RS' : 'L';
    const sizeValue = formData.type === ComponentType.RAMP ? formData.size : formData.size.replace('x', '');
    
    try {
      const response = await fetch(`/api/components/nextId?prefix=${prefix}&size=${sizeValue}`);
      if (!response.ok) throw new Error('Failed to generate ID');
      const data = await response.json();
      setFormData(prev => ({ ...prev, id: data.nextId }));
    } catch (error) {
      console.error('Error generating ID:', error);
    }
  }, [formData.type, formData.size]);

  useEffect(() => {
    if (formData.type && formData.size && !initialData) {
      generateId();
    }
  }, [formData.type, formData.size, initialData, generateId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="">Select a type</option>
          {Object.values(ComponentType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
        <input
          type="text"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
          placeholder={formData.type === ComponentType.RAMP ? 'Length in feet' : 'Width x Length (e.g., 5x5)'}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {Object.values(ComponentStatus).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          {Object.values(ComponentLocation).map((location) => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          readOnly
          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
        />
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Component
        </button>
      </div>
    </form>
  );
}
```

# src/components/CalculatedFields.tsx

```tsx
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface CalculatedFieldsProps {
  control: Control<any>;
}

export default function CalculatedFields({ control }: CalculatedFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="deliveryFee" className="block text-sm font-medium text-gray-700">Delivery Fee</label>
        <Controller
          name="deliveryFee"
          control={control}
          render={({ field }) => (
            <input id="deliveryFee" type="number" {...field} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-100" />
          )}
        />
      </div>
      <div>
        <label htmlFor="installFee" className="block text-sm font-medium text-gray-700">Install Fee</label>
        <Controller
          name="installFee"
          control={control}
          render={({ field }) => (
            <input id="installFee" type="number" {...field} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-100" />
          )}
        />
      </div>
      <div>
        <label htmlFor="monthlyRentalRate" className="block text-sm font-medium text-gray-700">Monthly Rental Rate</label>
        <Controller
          name="monthlyRentalRate"
          control={control}
          render={({ field }) => (
            <input id="monthlyRentalRate" type="number" {...field} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-gray-100" />
          )}
        />
      </div>
    </>
  );
}
```

# src/app/page.tsx

```tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { JobStatus } from "@/lib/constants";
import UpcomingJobs from "@/components/UpcomingJobs";

async function getDashboardData() {
  const customerCount = await prisma.customer.count();
  const activeJobCount = await prisma.job.count({
    where: {
      status: {
        in: [JobStatus.QUOTED, JobStatus.SCHEDULED, JobStatus.INSTALLED]
      }
    }
  });
  const availableComponentCount = await prisma.component.count({
    where: {
      status: 'AVAILABLE'
    }
  });

  const upcomingJobs = await prisma.job.findMany({
    where: {
      status: JobStatus.SCHEDULED,
    },
    orderBy: {
      scheduledAt: 'asc',
    },
    take: 5,
    include: {
      customer: {
        select: {
          name: true,
        },
      },
    },
  });

  return { customerCount, activeJobCount, availableComponentCount, upcomingJobs };
}

export default async function DashboardPage() {
  const { customerCount, activeJobCount, availableComponentCount, upcomingJobs } = await getDashboardData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <DashboardCard title="Total Customers" value={customerCount} />
        <DashboardCard title="Active Jobs" value={activeJobCount} />
        <DashboardCard title="Available Components" value={availableComponentCount} />
      </div>
      <div className="mb-8">
        <UpcomingJobs jobs={upcomingJobs} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <QuickActionCard title="Customers" actions={[
          { label: "View All Customers", href: "/customers" },
          { label: "Add New Customer", href: "/customers/new" },
        ]} />
        <QuickActionCard title="Jobs" actions={[
          { label: "View All Jobs", href: "/jobs" },
          { label: "Create New Job", href: "/jobs/new" },
        ]} />
        <QuickActionCard title="Management" actions={[
          { label: "Manage Pricing Variables", href: "/pricing" },
          { label: "View Inventory", href: "/inventory" },
        ]} />
      </div>
    </div>
  );
}

function DashboardCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function QuickActionCard({ title, actions }: { title: string; actions: { label: string; href: string }[] }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {actions.map((action, index) => (
          <Link key={index} href={action.href} className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
```

# src/app/layout.tsx

```tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wheelchair Ramp Rental',
  description: 'Manage your wheelchair ramp rentals efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-2xl font-bold">
              Wheelchair Ramp Rental
            </Link>
            <div className="space-x-4">
              <NavLink href="/customers">Customers</NavLink>
              <NavLink href="/jobs">Jobs</NavLink>
              <NavLink href="/inventory">Inventory</NavLink>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white hover:text-blue-200">
      {children}
    </Link>
  )
}
```

# src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

```

# src/app/favicon.ico

This is a binary file of the type: Binary

# prisma/migrations/migration_lock.toml

```toml
# Please do not edit this file manually
# It should be added in your version-control system (i.e. Git)
provider = "sqlite"
```

# src/app/pricing/page.tsx

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import PricingVariables from '@/components/PricingVariables';

interface PricingVariablesData {
  id?: number;
  trailerRentalCost: number;
  perMileCost: number;
  rentalRatePerFoot: number;
  installRatePerSection: number;
  installRatePerLanding: number;
}

export default function PricingPage() {
  const [pricingData, setPricingData] = useState<PricingVariablesData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchPricingVariables();
  }, []);

  const fetchPricingVariables = async () => {
    try {
      const response = await fetch('/api/pricing-variables');
      if (!response.ok) {
        throw new Error('Failed to fetch pricing variables');
      }
      const data = await response.json();
      setPricingData(data);
    } catch (err) {
      setError('Failed to load pricing variables. Please try again.');
      console.error(err);
    }
  };

  const handleSave = async (formData: PricingVariablesData) => {
    try {
      setError(null);
      setSuccess(null);

      const response = await fetch('/api/pricing-variables', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update pricing variables');
      }

      const updatedData = await response.json();
      setPricingData(updatedData);
      setSuccess('Pricing variables updated successfully');
    } catch (err) {
      setError('An error occurred while updating pricing variables. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Pricing Variables</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      {pricingData ? (
        <PricingVariables initialData={pricingData} onSave={handleSave} />
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}
```

# src/components/JobExecutionWizard/index.tsx

```tsx
import React, { useState } from 'react';
import ComponentCheckList from './ComponentCheckList';
import CustomerNotification from './CustomerNotification';
import AddressNavigation from './AddressNavigation';
import InstallationTimer from './InstallationTimer';
import PhotoCapture from './PhotoCapture';

interface Component {
  id: string;
  type: string;
  size: string;
}

interface Customer {
  id: string;
  name: string;
  address: string;
}

interface Job {
  id: string;
  customerId: string;
  customer: Customer;
  status: string;
  scheduledAt: string;
  address: string;
  deliveryFee: number;
  installFee: number;
  monthlyRentalRate: number;
  notes: string;
  components: Component[];
}

interface JobExecutionWizardProps {
  job: Job;
}

const steps = [
  'Component Check',
  'Customer Notification',
  'Navigation',
  'Installation',
  'Photo Capture',
];

const JobExecutionWizard: React.FC<JobExecutionWizardProps> = ({ job }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [executionData, setExecutionData] = useState({
    componentsLoaded: false,
    customerNotified: false,
    arrivalTime: null as Date | null,
    installationStartTime: null as Date | null,
    installationEndTime: null as Date | null,
    photos: [] as string[],
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleJobCompletion();
    }
  };

  const handleJobCompletion = async () => {
    // TODO: Implement API call to update job status and save execution data
    console.log('Job completed', executionData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ComponentCheckList job={job} onComplete={() => setExecutionData({ ...executionData, componentsLoaded: true })} />;
      case 1:
        return <CustomerNotification job={job} onComplete={() => setExecutionData({ ...executionData, customerNotified: true })} />;
      case 2:
        return <AddressNavigation job={job} onComplete={(arrivalTime) => setExecutionData({ ...executionData, arrivalTime })} />;
      case 3:
        return <InstallationTimer onComplete={(startTime: Date, endTime: Date) => setExecutionData({ ...executionData, installationStartTime: startTime, installationEndTime: endTime })} />;
      case 4:
        return <PhotoCapture onComplete={(photos: string[]) => setExecutionData({ ...executionData, photos })} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-4">
        {steps.map((step, index) => (
          <span
            key={step}
            className={`mr-2 ${
              index === currentStep ? 'font-bold' : 'text-gray-500'
            }`}
          >
            {step}
            {index < steps.length - 1 && ' >'}
          </span>
        ))}
      </div>
      {renderStep()}
      <button
        onClick={handleNext}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {currentStep === steps.length - 1 ? 'Complete Job' : 'Next Step'}
      </button>
    </div>
  );
};

export default JobExecutionWizard;
```

# src/components/JobExecutionWizard/PhotoCapture.tsx

```tsx
import React, { useState } from 'react';
import Image from 'next/image';

interface PhotoCaptureProps {
  onComplete: (photos: string[]) => void;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onComplete }) => {
  const [photos, setPhotos] = useState<string[]>([]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
  };

  const handleComplete = () => {
    onComplete(photos);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Photo Capture</h2>
      <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} />
      <div className="mt-4 grid grid-cols-2 gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <Image
              src={photo}
              alt={`Captured photo ${index + 1}`}
              layout="responsive"
              width={500}
              height={500}
              objectFit="cover"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleComplete}
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Complete Photo Capture
      </button>
    </div>
  );
};

export default PhotoCapture;
```

# src/components/JobExecutionWizard/InstallationTimer.tsx

```tsx
import React, { useState, useEffect } from 'react';

interface InstallationTimerProps {
  onComplete: (startTime: Date, endTime: Date) => void;
}

const InstallationTimer: React.FC<InstallationTimerProps> = ({ onComplete }) => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && !endTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  const handleStartInstallation = () => {
    setStartTime(new Date());
  };

  const handleEndInstallation = () => {
    const end = new Date();
    setEndTime(end);
    if (startTime) {
      onComplete(startTime, end);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Installation Timer</h2>
      <p className="text-2xl font-mono mb-4">{formatTime(elapsedTime)}</p>
      {!startTime && (
        <button
          onClick={handleStartInstallation}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          Start Installation
        </button>
      )}
      {startTime && !endTime && (
        <button
          onClick={handleEndInstallation}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          End Installation
        </button>
      )}
    </div>
  );
};

export default InstallationTimer;
```

# src/components/JobExecutionWizard/CustomerNotification.tsx

```tsx
import React, { useState } from 'react';

interface CustomerNotificationProps {
  job: {
    customer: {
      name: string;
    };
    address: string;
  };
  onComplete: () => void;
}

const CustomerNotification: React.FC<CustomerNotificationProps> = ({ job, onComplete }) => {
  const [notificationSent, setNotificationSent] = useState(false);

  const sendNotification = async () => {
    try {
      // TODO: Implement actual notification logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      setNotificationSent(true);
      onComplete();
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Customer Notification</h2>
      <p>Customer: {job.customer.name}</p>
      <p>Address: {job.address}</p>
      <button
        onClick={sendNotification}
        disabled={notificationSent}
        className={`mt-4 px-4 py-2 rounded ${
          notificationSent ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        {notificationSent ? 'Notification Sent' : 'Send Notification'}
      </button>
    </div>
  );
};

export default CustomerNotification;
```

# src/components/JobExecutionWizard/ComponentCheckList.tsx

```tsx
import React, { useState } from 'react';

interface Component {
  id: string;
  type: string;
  size: string;
}

interface ComponentCheckListProps {
  job: {
    components: Component[];
  };
  onComplete: () => void;
}

const ComponentCheckList: React.FC<ComponentCheckListProps> = ({ job, onComplete }) => {
  const [checked, setChecked] = useState<string[]>([]);

  const handleCheck = (componentId: string) => {
    setChecked(prev =>
      prev.includes(componentId)
        ? prev.filter(id => id !== componentId)
        : [...prev, componentId]
    );
  };

  const allChecked = job.components.every(component => checked.includes(component.id));

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Component Check</h2>
      <ul className="space-y-2">
        {job.components.map(component => (
          <li key={component.id} className="flex items-center">
            <input
              type="checkbox"
              id={component.id}
              checked={checked.includes(component.id)}
              onChange={() => handleCheck(component.id)}
              className="mr-2"
            />
            <label htmlFor={component.id}>{component.type} - {component.size}</label>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onComplete()}
        disabled={!allChecked}
        className={`mt-4 px-4 py-2 rounded ${
          allChecked ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300'
        } text-white`}
      >
        All Components Loaded
      </button>
    </div>
  );
};

export default ComponentCheckList;
```

# src/components/JobExecutionWizard/AddressNavigation.tsx

```tsx
import React, { useState } from 'react';

interface AddressNavigationProps {
  job: {
    address: string;
  };
  onComplete: (arrivalTime: Date) => void;
}

const AddressNavigation: React.FC<AddressNavigationProps> = ({ job, onComplete }) => {
  const [arrived, setArrived] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(job.address);
  };

  const handleArrived = () => {
    const arrivalTime = new Date();
    setArrived(true);
    onComplete(arrivalTime);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      <p>Address: {job.address}</p>
      <button
        onClick={handleCopyAddress}
        className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Copy Address
      </button>
      <button
        onClick={handleArrived}
        disabled={arrived}
        className={`mt-4 px-4 py-2 rounded ${
          arrived ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-600'
        } text-white`}
      >
        {arrived ? 'Arrived' : 'Mark as Arrived'}
      </button>
    </div>
  );
};

export default AddressNavigation;
```

# src/app/jobs/page.tsx

```tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { JobStatus } from '@/lib/constants';

interface Component {
  id: string;
  type: string;
  size: string;
}

interface Job {
  id: string;
  customerId: string;
  customerName: string;
  status: string;
  scheduledAt: string;
  address: string;
  deliveryFee: number;
  installFee: number;
  monthlyRentalRate: number;
  components?: Component[];
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('scheduledAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterStatus, setFilterStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        sortBy,
        sortOrder,
        filterStatus,
      });

      const response = await fetch(`/api/jobs?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      setError('Failed to load jobs. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, sortBy, sortOrder, filterStatus]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleRowClick = (id: string) => {
    router.push(`/jobs/${id}/edit`);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const formatComponents = (components?: Component[]) => {
    if (!components || components.length === 0) {
      return 'No components';
    }
    return components.map(c => c.id).join(', ');
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Jobs</h1>
        <Link href="/jobs/new" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add New Job
        </Link>
      </div>
      <div className="mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Statuses</option>
          {Object.values(JobStatus).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th onClick={() => handleSort('customerName')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Customer {sortBy === 'customerName' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('status')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Status {sortBy === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('scheduledAt')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Scheduled Date {sortBy === 'scheduledAt' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('address')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Address {sortBy === 'address' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('deliveryFee')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Delivery Fee {sortBy === 'deliveryFee' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('installFee')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Install Fee {sortBy === 'installFee' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th onClick={() => handleSort('monthlyRentalRate')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                Monthly Rental {sortBy === 'monthlyRentalRate' && (sortOrder === 'asc' ? '▲' : '▼')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Component IDs
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr 
                  key={job.id} 
                  onClick={() => handleRowClick(job.id)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{job.customerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(job.scheduledAt).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${job.deliveryFee.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${job.installFee.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${job.monthlyRentalRate.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatComponents(job.components)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center">No jobs found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

# src/app/inventory/page.tsx

```tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { ComponentType, ComponentStatus, ComponentLocation } from '@/lib/constants';

interface Component {
  id: string;
  type: string;
  size: string;
  status: string;
  location: string;
  jobId?: string;
}

export default function InventoryPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('type');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const router = useRouter();

  const fetchComponents = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search,
        sortBy,
        sortOrder,
        filterType,
        filterStatus,
      });

      const response = await fetch(`/api/components?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch components');
      }
      const data = await response.json();
      setComponents(data.components);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to load components. Please try again.');
      console.error(err);
    }
  }, [currentPage, search, sortBy, sortOrder, filterType, filterStatus]);

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <Link href="/inventory/new" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add New Component
        </Link>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Types</option>
          {Object.values(ComponentType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Statuses</option>
          {Object.values(ComponentStatus).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto max-h-[60vh]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('id')}>
                  ID {sortBy === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('type')}>
                  Type {sortBy === 'type' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('size')}>
                  Size {sortBy === 'size' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                  Status {sortBy === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('location')}>
                  Location {sortBy === 'location' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {components.map((component) => (
                <tr key={component.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{component.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{component.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{component.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{component.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{component.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Link href={`/inventory/${component.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                      Edit
                    </Link>
                    {component.jobId && (
                      <Link href={`/jobs/${component.jobId}/edit`} className="text-blue-600 hover:text-blue-900">
                        View Job
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

# src/app/customers/page.tsx

```tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const router = useRouter();

  const fetchCustomers = useCallback(async () => {
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        sortBy,
        sortOrder,
      });

      const response = await fetch(`/api/customers?${queryParams}`);
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data.customers);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to load customers. Please try again.');
      console.error(err);
    }
  }, [currentPage, sortBy, sortOrder]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleRowClick = (id: string) => {
    router.push(`/customers/${id}/edit`);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Link href="/customers/new" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Add New Customer
        </Link>
      </div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto max-h-[70vh]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Name {sortBy === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  Email {sortBy === 'email' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('phone')}
                >
                  Phone {sortBy === 'phone' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('address')}
                >
                  Address {sortBy === 'address' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr 
                  key={customer.id} 
                  onClick={() => handleRowClick(customer.id)}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{customer.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

# prisma/migrations/20240801152825_add_component_location/migration.sql

```sql
/*
  Warnings:

  - You are about to drop the column `price` on the `Job` table. All the data in the column will be lost.
  - Added the required column `deliveryFee` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installFee` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyRentalRate` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PricingVariables" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "trailerRentalCost" REAL NOT NULL,
    "perMileCost" REAL NOT NULL,
    "rentalRatePerFoot" REAL NOT NULL,
    "installRatePerSection" REAL NOT NULL,
    "installRatePerLanding" REAL NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Component" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "location" TEXT NOT NULL DEFAULT 'Warehouse'
);
INSERT INTO "new_Component" ("id", "size", "status", "type") SELECT "id", "size", "status", "type" FROM "Component";
DROP TABLE "Component";
ALTER TABLE "new_Component" RENAME TO "Component";
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "scheduledAt" DATETIME NOT NULL,
    "address" TEXT NOT NULL,
    "deliveryFee" REAL NOT NULL,
    "installFee" REAL NOT NULL,
    "monthlyRentalRate" REAL NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Job_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("address", "createdAt", "customerId", "id", "notes", "scheduledAt", "status", "updatedAt") SELECT "address", "createdAt", "customerId", "id", "notes", "scheduledAt", "status", "updatedAt" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

```

# prisma/migrations/20240801190043_add_jobs_to_customer/migration.sql

```sql
/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

```

# prisma/migrations/20240731230202_update_component_schema/migration.sql

```sql
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Component" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE'
);
INSERT INTO "new_Component" ("id", "size", "status", "type") SELECT "id", "size", "status", "type" FROM "Component";
DROP TABLE "Component";
ALTER TABLE "new_Component" RENAME TO "Component";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

```

# prisma/migrations/20240731231421_add_customer_notes/migration.sql

```sql
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN "notes" TEXT;

```

# prisma/migrations/20240731221851_init/migration.sql

```sql
-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "scheduledAt" DATETIME NOT NULL,
    "address" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Job_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Component" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ComponentToJob" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ComponentToJob_A_fkey" FOREIGN KEY ("A") REFERENCES "Component" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ComponentToJob_B_fkey" FOREIGN KEY ("B") REFERENCES "Job" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ComponentToJob_AB_unique" ON "_ComponentToJob"("A", "B");

-- CreateIndex
CREATE INDEX "_ComponentToJob_B_index" ON "_ComponentToJob"("B");

```

# prisma/migrations/20240731222751_add_user_model/migration.sql

```sql
-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

```

# src/app/jobs/new/page.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import JobForm from '@/components/JobForm';

interface Customer {
  id: string;
  name: string;
  address: string;
}

interface Component {
  id: string;
  type: string;
  size: string;
  status: string;
  location: string;
}

interface PricingVariables {
  trailerRentalCost: number;
  perMileCost: number;
  rentalRatePerFoot: number;
  installRatePerSection: number;
  installRatePerLanding: number;
}

export default function NewJobPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [availableComponents, setAvailableComponents] = useState<Component[]>([]);
  const [pricingVariables, setPricingVariables] = useState<PricingVariables | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchCustomers(),
          fetchAvailableComponents(),
          fetchPricingVariables()
        ]);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load necessary data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchCustomers = async () => {
    const response = await fetch('/api/customers');
    if (!response.ok) {
      throw new Error('Failed to fetch customers');
    }
    const data = await response.json();
    setCustomers(data.customers); // Change this line
  };

  const fetchAvailableComponents = async () => {
    const response = await fetch('/api/components?status=AVAILABLE');
    if (!response.ok) {
      throw new Error('Failed to fetch available components');
    }
    const data = await response.json();
    setAvailableComponents(data.components);
  };

  const fetchPricingVariables = async () => {
    const response = await fetch('/api/pricing-variables');
    if (!response.ok) {
      throw new Error('Failed to fetch pricing variables');
    }
    const data = await response.json();
    setPricingVariables(data);
  };

  const handleSubmit = async (formData: {
    customerId: string;
    status: string;
    scheduledAt: string;
    address: string;
    deliveryFee: number;
    installFee: number;
    monthlyRentalRate: number;
    notes: string;
    components: string[];
  }) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create job');
      }

      router.push('/jobs');
    } catch (err) {
      setError('An error occurred while creating the job. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  if (!pricingVariables || customers.length === 0 || availableComponents.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Warning:</strong>
          <span className="block sm:inline"> Some required data is missing. Please ensure that customers, components, and pricing variables are set up in the system.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Job</h1>
      <JobForm 
        onSubmit={handleSubmit} 
        customers={customers} 
        availableComponents={availableComponents}
        pricingVariables={pricingVariables}
      />
    </div>
  );
}
```

# src/app/jobs/[id]/route.ts

```ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: {
        components: true,
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Failed to fetch job:', error);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { customerId, status, scheduledAt, address, deliveryFee, installFee, monthlyRentalRate, notes, components } = body;

    const updatedJob = await prisma.job.update({
      where: { id: params.id },
      data: {
        customerId,
        status,
        scheduledAt: new Date(scheduledAt),
        address,
        deliveryFee: parseFloat(deliveryFee),
        installFee: parseFloat(installFee),
        monthlyRentalRate: parseFloat(monthlyRentalRate),
        notes,
        components: {
          set: components.map((id: string) => ({ id }))
        }
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error('Failed to update job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}
```

# src/app/inventory/new/page.tsx

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ComponentForm from '@/components/ComponentForm';

export default function NewComponentPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (formData: { id: string; type: string; size: string }) => {
    try {
      const response = await fetch('/api/components', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create component');
      }

      setSuccess('Component created successfully');
      setTimeout(() => {
        router.push('/inventory');
      }, 2000);
    } catch (err) {
      setError('An error occurred while creating the component. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Component</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      <ComponentForm onSubmit={handleSubmit} />
    </div>
  );
}
```

# src/app/customers/new/page.tsx

```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomerForm from '@/components/CustomerForm';

export default function NewCustomerPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: { name: string; email: string; phone: string; address: string }) => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create customer');
      }

      router.push('/customers');
    } catch (err) {
      setError('An error occurred while creating the customer. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Customer</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <CustomerForm onSubmit={handleSubmit} />
    </div>
  );
}
```

# src/app/api/customers/route.ts

```ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const sortBy = searchParams.get('sortBy') || 'name';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  const skip = (page - 1) * limit;

  try {
    const [customers, totalCount] = await Promise.all([
      prisma.customer.findMany({
        orderBy: { [sortBy]: sortOrder as 'asc' | 'desc' },
        skip,
        take: limit,
      }),
      prisma.customer.count(),
    ]);

    return NextResponse.json({
      customers,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, notes } = body;

    const newCustomer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        address,
        notes,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error('Failed to create customer:', error);
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}
```

# src/app/api/pricing-variables/route.ts

```ts
// src/app/api/pricing-variables/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const pricingVariables = await prisma.pricingVariables.findFirst();
    if (!pricingVariables) {
      return NextResponse.json({ error: 'Pricing variables not found' }, { status: 404 });
    }
    return NextResponse.json(pricingVariables);
  } catch (error) {
    console.error('Failed to fetch pricing variables:', error);
    return NextResponse.json({ error: 'Failed to fetch pricing variables' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { trailerRentalCost, perMileCost, rentalRatePerFoot, installRatePerSection, installRatePerLanding } = body;

    const pricingVariables = await prisma.pricingVariables.upsert({
      where: { id: 1 }, // Assuming we only have one set of pricing variables
      update: {
        trailerRentalCost,
        perMileCost,
        rentalRatePerFoot,
        installRatePerSection,
        installRatePerLanding,
      },
      create: {
        trailerRentalCost,
        perMileCost,
        rentalRatePerFoot,
        installRatePerSection,
        installRatePerLanding,
      },
    });

    return NextResponse.json(pricingVariables);
  } catch (error) {
    console.error('Failed to update pricing variables:', error);
    return NextResponse.json({ error: 'Failed to update pricing variables' }, { status: 500 });
  }
}
```

# src/app/api/jobs/route.ts

```ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const sortBy = searchParams.get('sortBy') || 'scheduledAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const filterStatus = searchParams.get('filterStatus') || '';

  const skip = (page - 1) * limit;

  try {
    const where = filterStatus ? { status: filterStatus } : {};

    const [jobs, totalCount] = await Promise.all([
      prisma.job.findMany({
        where,
        orderBy: { [sortBy]: sortOrder as 'asc' | 'desc' },
        skip,
        take: limit,
        include: {
          customer: {
            select: { name: true },
          },
          components: {
            select: { id: true, type: true, size: true },
          },
        },
      }),
      prisma.job.count({ where }),
    ]);

    const formattedJobs = jobs.map(job => ({
      ...job,
      customerName: job.customer.name,
    }));

    return NextResponse.json({
      jobs: formattedJobs,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerId, status, scheduledAt, address, deliveryFee, installFee, monthlyRentalRate, notes, components } = body;

    // Validate input
    if (!customerId || !status || !scheduledAt || !address) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if all components are available
    const componentIds = components.map((id: string) => id);
    const existingComponents = await prisma.component.findMany({
      where: { id: { in: componentIds } },
    });

    const unavailableComponents = existingComponents.filter(
      component => component.status !== 'AVAILABLE'
    );

    if (unavailableComponents.length > 0) {
      return NextResponse.json({
        error: 'Some components are not available',
        unavailableComponents: unavailableComponents.map(c => c.id),
      }, { status: 400 });
    }

    // Determine component status based on job status
    const componentStatus = status === 'INSTALLED' ? 'INSTALLED' : 'RESERVED';
    const componentLocation = status === 'INSTALLED' ? address : 'Warehouse';

    const newJob = await prisma.job.create({
      data: {
        customerId,
        status,
        scheduledAt: new Date(scheduledAt),
        address,
        deliveryFee: parseFloat(deliveryFee) || 0,
        installFee: parseFloat(installFee) || 0,
        monthlyRentalRate: parseFloat(monthlyRentalRate) || 0,
        notes,
        components: {
          connect: components.map((id: string) => ({ id }))
        }
      },
      include: {
        customer: {
          select: { name: true },
        },
        components: true,
      },
    });

    
    // Update component statuses and locations
    await prisma.component.updateMany({
      where: { id: { in: componentIds } },
      data: { status: componentStatus, location: componentLocation },
    });

    const formattedJob = {
      ...newJob,
      customerName: newJob.customer.name,
    };

    return NextResponse.json(formattedJob, { status: 201 });
  } catch (error) {
    console.error('Failed to create job:', error);
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
  }
}

```

# src/app/api/components/route.ts

```ts
// src/app/api/components/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ComponentStatus, ComponentLocation } from '@/lib/constants';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const search = searchParams.get('search') || '';
  const sortBy = searchParams.get('sortBy') || 'type';
  const sortOrder = searchParams.get('sortOrder') || 'asc';
  const filterType = searchParams.get('filterType') || '';
  const filterStatus = searchParams.get('filterStatus') || '';

  const skip = (page - 1) * limit;

  try {
    const where = {
      AND: [
        search ? {
          OR: [
            { id: { contains: search, mode: 'insensitive' } },
            { type: { contains: search, mode: 'insensitive' } },
            { size: { contains: search, mode: 'insensitive' } },
            { status: { contains: search, mode: 'insensitive' } },
            { location: { contains: search, mode: 'insensitive' } },
          ],
        } : {},
        filterType ? { type: filterType } : {},
        filterStatus ? { status: filterStatus } : {},
      ],
    };

    const [components, totalCount] = await Promise.all([
      prisma.component.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
        select: {
          id: true,
          type: true,
          size: true,
          status: true,
          location: true,
          jobs: {
            select: {
              id: true,
            },
            take: 1,
          },
        },
      }),
      prisma.component.count({ where }),
    ]);

    const formattedComponents = components.map(comp => ({
      ...comp,
      jobId: comp.jobs[0]?.id || null,
      jobs: undefined,
    }));

    return NextResponse.json({
      components: formattedComponents,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Failed to fetch components:', error);
    return NextResponse.json({ error: 'Failed to fetch components' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, type, size } = body;

    const newComponent = await prisma.component.create({
      data: {
        id,
        type,
        size,
        status: ComponentStatus.AVAILABLE,
        location: ComponentLocation.WAREHOUSE,
      },
    });

    return NextResponse.json(newComponent, { status: 201 });
  } catch (error) {
    console.error('Failed to create component:', error);
    return NextResponse.json({ error: 'Failed to create component' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, action } = body;

    if (!id || !action) {
      return NextResponse.json({ error: 'Missing id or action' }, { status: 400 });
    }

    const component = await prisma.component.findUnique({
      where: { id },
      include: { jobs: true }
    });

    if (!component) {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 });
    }

    if (action === 'setMaintenance' && component.jobs.length > 0) {
      return NextResponse.json({ error: 'Cannot set component to maintenance while assigned to a job' }, { status: 400 });
    }

    let newStatus;
    let newLocation;
    if (action === 'setMaintenance') {
      newStatus = ComponentStatus.MAINTENANCE;
      newLocation = ComponentLocation.WAREHOUSE;
    } else if (action === 'setAvailable') {
      newStatus = ComponentStatus.AVAILABLE;
      newLocation = ComponentLocation.WAREHOUSE;
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const updatedComponent = await prisma.component.update({
      where: { id },
      data: {
        status: newStatus,
        location: newLocation,
      },
    });

    return NextResponse.json(updatedComponent);
  } catch (error) {
    console.error('Failed to update component:', error);
    return NextResponse.json({ error: 'Failed to update component' }, { status: 500 });
  }
}
```

# src/app/api/calculate-distance/route.ts

```ts
import { NextResponse } from 'next/server';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function POST(request: Request) {
  try {
    const { origin, destination } = await request.json();

    if (!origin || !destination) {
      return NextResponse.json({ error: 'Origin and destination are required' }, { status: 400 });
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.rows[0].elements[0].status === 'OK') {
      const distanceInMeters = data.rows[0].elements[0].distance.value;
      const distanceInMiles = distanceInMeters / 1609.34; // Convert meters to miles

      return NextResponse.json({ distance: distanceInMiles });
    } else {
      throw new Error('Unable to calculate distance');
    }
  } catch (error) {
    console.error('Error calculating distance:', error);
    return NextResponse.json({ error: 'Failed to calculate distance' }, { status: 500 });
  }
}
```

# src/app/jobs/[id]/execute/page.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import JobExecutionWizard from '@/components/JobExecutionWizard';

interface Component {
  id: string;
  type: string;
  size: string;
}

interface Customer {
  id: string;
  name: string;
  address: string;
}

interface Job {
  id: string;
  customerId: string;
  customer: Customer;
  status: string;
  scheduledAt: string;
  address: string;
  deliveryFee: number;
  installFee: number;
  monthlyRentalRate: number;
  notes: string;
  components: Component[];
}

export default function JobExecutionPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job');
        }
        const data: Job = await response.json();
        setJob(data);
      } catch (err) {
        setError('Failed to load job data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Execute Job</h1>
      <JobExecutionWizard job={job} />
    </div>
  );
}
```

# src/app/jobs/[id]/edit/page.tsx

```tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import JobForm from '@/components/JobForm';

interface Customer {
  id: string;
  name: string;
  address: string;
}

interface Component {
  id: string;
  type: string;
  size: string;
  status: string;
  location: string;
}

interface PricingVariables {
  trailerRentalCost: number;
  perMileCost: number;
  rentalRatePerFoot: number;
  installRatePerSection: number;
  installRatePerLanding: number;
}

interface Job {
  id: string;
  customerId: string;
  customer: Customer;
  status: string;
  scheduledAt: string;
  address: string;
  deliveryFee: number;
  installFee: number;
  monthlyRentalRate: number;
  notes: string;
  components: Component[];
}

export default function EditJobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [availableComponents, setAvailableComponents] = useState<Component[]>([]);
  const [pricingVariables, setPricingVariables] = useState<PricingVariables | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchJob = useCallback(async () => {
    try {
      const response = await fetch(`/api/jobs/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch job');
      }
      const data = await response.json();
      setJob(data);
    } catch (err) {
      setError('Failed to fetch job. Please try again.');
    }
  }, [params.id]);

  const fetchCustomers = useCallback(async () => {
    try {
      const response = await fetch('/api/customers');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data.customers);
    } catch (err) {
      setError('Failed to fetch customers. Please try again.');
    }
  }, []);

  const fetchAvailableComponents = useCallback(async () => {
    try {
      const response = await fetch('/api/components');
      if (!response.ok) {
        throw new Error('Failed to fetch available components');
      }
      const data = await response.json();
      setAvailableComponents(data.components);
    } catch (err) {
      setError('Failed to fetch available components. Please try again.');
    }
  }, []);

  const fetchPricingVariables = useCallback(async () => {
    try {
      const response = await fetch('/api/pricing-variables');
      if (!response.ok) {
        throw new Error('Failed to fetch pricing variables');
      }
      const data = await response.json();
      setPricingVariables(data);
    } catch (err) {
      setError('Failed to fetch pricing variables. Please try again.');
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchJob(), fetchCustomers(), fetchAvailableComponents(), fetchPricingVariables()]);
  }, [fetchJob, fetchCustomers, fetchAvailableComponents, fetchPricingVariables]);

  const handleSubmit = async (formData: {
    customerId: string;
    status: string;
    scheduledAt: string;
    address: string;
    deliveryFee: number;
    installFee: number;
    monthlyRentalRate: number;
    notes: string;
    components: string[];
  }) => {
    try {
      const response = await fetch(`/api/jobs/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          id: params.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update job');
      }

      router.push('/jobs');
    } catch (err) {
      if (err instanceof Error) {
        setError(`An error occurred while updating the job: ${err.message}`);
      } else {
        setError('An unknown error occurred while updating the job');
      }
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/jobs/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete job');
      }

      router.push('/jobs');
    } catch (err) {
      setError('An error occurred while deleting the job. Please try again.');
    }
  };

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  if (!job || !pricingVariables) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  const initialData = {
    ...job,
    components: job.components.map(comp => comp.id),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Job</h1>
      <JobForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        customers={customers}
        availableComponents={availableComponents}
        pricingVariables={pricingVariables}
      />
    </div>
  );
}
```

# src/app/inventory/[id]/edit/page.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ComponentForm from '@/components/ComponentForm';
import { ComponentStatus } from '@/lib/constants';

interface Component {
  id: string;
  type: string;
  size: string;
  status: string;
  location: string;
}

export default function EditComponentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [component, setComponent] = useState<Component | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchComponent = async () => {
      try {
        const response = await fetch(`/api/components/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch component');
        }
        const data = await response.json();
        setComponent(data);
      } catch (err) {
        setError('Failed to load component data. Please try again.');
        console.error(err);
      }
    };

    fetchComponent();
  }, [params.id]);

  const handleSubmit = async (formData: Component) => {
    try {
      const response = await fetch(`/api/components/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update component');
      }

      setSuccess('Component updated successfully');
      setTimeout(() => {
        router.push('/inventory');
      }, 2000);
    } catch (err) {
      setError('An error occurred while updating the component. Please try again.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this component?')) {
      try {
        const response = await fetch(`/api/components/${params.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete component');
        }

        setSuccess('Component deleted successfully');
        setTimeout(() => {
          router.push('/inventory');
        }, 2000);
      } catch (err) {
        setError('An error occurred while deleting the component. Please try again.');
        console.error(err);
      }
    }
  };

  const handleSetMaintenance = async () => {
    try {
      const response = await fetch('/api/components', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: params.id, action: 'setMaintenance' }),
      });

      if (!response.ok) {
        throw new Error('Failed to set component to maintenance');
      }

      setSuccess('Component set to maintenance successfully');
      setTimeout(() => {
        router.push('/inventory');
      }, 2000);
    } catch (err) {
      setError('An error occurred while setting the component to maintenance. Please try again.');
      console.error(err);
    }
  };

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  if (!component) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Component</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{success}</span>
        </div>
      )}
      <ComponentForm initialData={component} onSubmit={handleSubmit} />
      <div className="mt-6 space-y-2">
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Delete Component
        </button>
        {component.status !== ComponentStatus.MAINTENANCE && (
          <button
            onClick={handleSetMaintenance}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Set to Maintenance
          </button>
        )}
      </div>
    </div>
  );
}
```

# src/app/customers/[id]/edit/page.tsx

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CustomerForm from '@/components/CustomerForm';

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`/api/customers/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch customer');
        }
        const data = await response.json();
        setCustomer(data);
      } catch (err) {
        setError('Failed to load customer data. Please try again.');
        console.error(err);
      }
    };

    fetchCustomer();
  }, [params.id]);

  const handleSubmit = async (formData: { name: string; email: string; phone: string; address: string; notes: string }) => {
    try {
      const response = await fetch(`/api/customers/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update customer');
      }

      router.push('/customers');
    } catch (err) {
      setError('An error occurred while updating the customer. Please try again.');
      console.error(err);
    }
  };

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  if (!customer) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Customer</h1>
      <CustomerForm initialData={customer} onSubmit={handleSubmit} />
    </div>
  );
}
```

# src/app/api/customers/web-form/route.ts

```ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 'Customer Name': fullName, Email, Phone, Address, Notes } = body;

    // Split the full name into first and last name
    const [firstName, ...lastNameParts] = fullName.split(' ');
    const lastName = lastNameParts.join(' ');

    const newCustomer = await prisma.customer.create({
      data: {
        name: fullName,
        email: Email,
        phone: Phone,
        address: Address,
        notes: Notes,
      },
    });

    return NextResponse.json(newCustomer, { status: 201 });
  } catch (error) {
    console.error('Failed to create customer:', error);
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}
```

# src/app/api/customers/[id]/route.ts

```ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: params.id },
    });

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('Failed to fetch customer:', error);
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, email, phone, address, notes } = body;

    const updatedCustomer = await prisma.customer.update({
      where: { id: params.id },
      data: {
        name,
        email,
        phone,
        address,
        notes,
      },
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error('Failed to update customer:', error);
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.customer.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete customer:', error);
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 });
  }
}
```

# src/app/api/jobs/[id]/route.ts

```ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ComponentStatus } from '@/lib/constants';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: {
        components: true,
        customer: true,
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error('Failed to fetch job:', error);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { customerId, status, scheduledAt, address, deliveryFee, installFee, monthlyRentalRate, notes, components } = body;

    const updatedJob = await prisma.job.update({
      where: { id: params.id },
      data: {
        customerId,
        status,
        scheduledAt: new Date(scheduledAt),
        address,
        deliveryFee: parseFloat(deliveryFee),
        installFee: parseFloat(installFee),
        monthlyRentalRate: parseFloat(monthlyRentalRate),
        notes,
        components: {
          set: components.map((id: string) => ({ id }))
        }
      },
      include: {
        components: true,
        customer: true,
      },
    });

    return NextResponse.json(updatedJob);
  } catch (error) {
    console.error('Failed to update job:', error);
    return NextResponse.json({ error: 'Failed to update job', details: error }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Fetch the job to get its components
    const job = await prisma.job.findUnique({
      where: { id: params.id },
      include: { components: true },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Update all components associated with this job to AVAILABLE status
    await prisma.component.updateMany({
      where: { id: { in: job.components.map(comp => comp.id) } },
      data: { 
        status: ComponentStatus.AVAILABLE,
        location: 'Warehouse' // Or whatever default location you use
      },
    });

    // Delete the job
    await prisma.job.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
```

# src/app/api/components/nextId/route.tsx

```tsx
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefix = searchParams.get('prefix');
  const size = searchParams.get('size');

  if (!prefix || !size) {
    return NextResponse.json({ error: 'Missing prefix or size' }, { status: 400 });
  }

  try {
    const components = await prisma.component.findMany({
      where: {
        id: {
          startsWith: `${prefix}_${size}_`,
        },
      },
      orderBy: {
        id: 'desc',
      },
      take: 1,
    });

    let nextNumber = 1;
    if (components.length > 0) {
      const lastId = components[0].id;
      const lastNumber = parseInt(lastId.split('_').pop() || '0', 10);
      nextNumber = lastNumber + 1;
    }

    const nextId = `${prefix}_${size}_${nextNumber.toString().padStart(2, '0')}`;

    return NextResponse.json({ nextId });
  } catch (error) {
    console.error('Failed to generate next ID:', error);
    return NextResponse.json({ error: 'Failed to generate next ID' }, { status: 500 });
  }
}
```

# src/app/api/components/[id]/route.ts

```ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const component = await prisma.component.findUnique({
      where: { id: params.id },
    });

    if (!component) {
      return NextResponse.json({ error: 'Component not found' }, { status: 404 });
    }

    return NextResponse.json(component);
  } catch (error) {
    console.error('Failed to fetch component:', error);
    return NextResponse.json({ error: 'Failed to fetch component' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { type, size, status } = body;

    const updatedComponent = await prisma.component.update({
      where: { id: params.id },
      data: {
        type,
        size,
        status,
      },
    });

    return NextResponse.json(updatedComponent);
  } catch (error) {
    console.error('Failed to update component:', error);
    return NextResponse.json({ error: 'Failed to update component' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const component = await prisma.component.findUnique({
      where: { id: params.id },
      include: { jobs: true },
    });

    if (component && component.jobs && component.jobs.length > 0) {
      return NextResponse.json({ error: 'Cannot delete component assigned to a job' }, { status: 400 });
    }

    await prisma.component.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete component:', error);
    return NextResponse.json({ error: 'Failed to delete component' }, { status: 500 });
  }
}
```

