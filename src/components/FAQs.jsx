import { Disclosure } from '@headlessui/react'
import { MdKeyboardArrowDown , MdKeyboardArrowUp} from "react-icons/md";

const gettingStartedFaqs = [
    {
        id: 'faq-gs-1',
        question: "How do you evaluate and vet senior software engineers?",
        answer: "We use a rigorous multi-stage vetting process including algorithmic problem-solving, real-world systems architecture evaluations, code reviews, and communication assessments. Only the top 5% of candidates pass.",
    },
    {
        id: 'faq-gs-2',
        question: "How quickly can an engineering team onboard to our codebase?",
        answer: "Our standard onboarding takes 3 to 5 business days. We begin with architectural ramp-up, local environment setups, and delivery of early PRs within the first sprint.",
    },
    {
        id: 'faq-gs-3',
        question: "What engagement models do you support?",
        answer: "We offer dedicated full-stack squads, staff augmentation for specialized technologies (AI/ML, Blockchain, Cloud), and fixed-scope milestone deliverables.",
    },
    {
        id: 'faq-gs-4',
        question: "Can we scale our team size dynamically as project needs change?",
        answer: "Yes, our flexible team scaling model allows you to ramp engineers up or down with a standard two-week notice period to adapt to sprint workloads.",
    },
    {
        id: 'faq-gs-5',
        question: "Do your engineers work in our timezone?",
        answer: "Yes, our engineering teams provide guaranteed minimum 4-5 hours of daily real-time timezone overlap with your product and tech leads.",
    },
];

const securityFaqs = [
    {
        id: 'faq-sec-1',
        question: "What security and compliance standards do you adhere to?",
        answer: "We follow security-by-design principles, OWASP Top 10 mitigation, SOC2 Type II compliance procedures, and HIPAA-compliant data handling for healthcare applications.",
    },
    {
        id: 'faq-sec-2',
        question: "Who owns the Intellectual Property (IP) of code written?",
        answer: "You maintain 100% full legal ownership of all source code, architecture diagrams, algorithms, and documentation created during our engagement from day one.",
    },
    {
        id: 'faq-sec-3',
        question: "How do you protect sensitive credentials and staging environments?",
        answer: "We mandate strict zero-trust access, SSO/MFA policies, enterprise secrets management (e.g. AWS Secrets Manager/Vault), and automated vulnerability scans in CI/CD pipelines.",
    },
    {
        id: 'faq-sec-4',
        question: "Do you sign non-disclosure agreements (NDAs) prior to discussions?",
        answer: "Yes, comprehensive mutual NDAs are executed before reviewing any technical specifications, repositories, or business logic.",
    },
    {
        id: 'faq-sec-5',
        question: "What automated testing and QA standards are enforced?",
        answer: "We enforce high test coverage requirements with unit, integration, and end-to-end test automation alongside static linting and SonarQube quality gates.",
    },
];


const FAQs = () => {
    return (
        <div className='container mx-auto'>
            <div className='xl:px-32 lg:px-20 lg:flex '>
               
                    <div className="mx-auto lg:w-1/2  px-6 py-24 sm:py-32 lg:px-8 lg:py-32 ">
                        <div className="mx-auto  divide-y divide-white/10">
                            <h2 className="text-3xl font-bold leading-10 tracking-tight text-white">Getting Started</h2>
                            <hr className='w-32 mt-12 bg-gradient-to-r h-[1px] from-[#FC466B] to-[#3F5EFB] '/>
                            <dl className="mt-4 space-y-6 divide-y divide-white/10">
                                {gettingStartedFaqs.map((faq) => (
                                    <Disclosure as="div" key={faq.id} className="pt-6">
                                        {({ open }) => (
                                            <>
                                                <dt>
                                                    <Disclosure.Button className="focus:text-green-400 focus:outline-none flex w-full items-start justify-between text-left text-white">
                                                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                                                        <span className="ml-6 flex h-7 items-center">
                                                            {open ? (
                                                                <MdKeyboardArrowUp className="h-6 w-6" aria-hidden="true" />
                                                            ) : (
                                                                <MdKeyboardArrowDown className="h-6 w-6" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </dt>
                                                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                    <p className="text-base leading-7 text-gray-300">{faq.answer}</p>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </dl>
                        </div>
                    </div>
                
                    <div className="mx-auto lg:w-1/2  px-6 py-24 sm:py-32 lg:px-8 lg:py-32 ">
                        <div className="mx-auto  divide-y divide-white/10">
                            <h2 className="text-3xl font-bold leading-10 tracking-tight text-white">Safety, Security and Polices</h2>
                            <hr className='w-32 mt-12 bg-gradient-to-r h-[1px] from-[#FC466B] to-[#3F5EFB] '/>
                            <dl className="mt-4 space-y-6 divide-y divide-white/10">
                                {securityFaqs.map((faq) => (
                                    <Disclosure as="div" key={faq.id} className="pt-6">
                                        {({ open }) => (
                                            <>
                                                <dt>
                                                    <Disclosure.Button className="focus:text-green-400 focus:outline-none flex w-full items-start justify-between text-left text-white">
                                                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                                                        <span className="ml-6 flex h-7 items-center">
                                                            {open ? (
                                                                <MdKeyboardArrowUp className="h-6 w-6" aria-hidden="true" />
                                                            ) : (
                                                                <MdKeyboardArrowDown className="h-6 w-6" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </dt>
                                                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                    <p className="text-base leading-7 text-gray-300">{faq.answer}</p>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </dl>
                        </div>
                    </div>

            </div>
        </div>
    )
}

export default FAQs