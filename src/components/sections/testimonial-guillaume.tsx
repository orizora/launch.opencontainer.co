import Image from "next/image";
import BlurText from "../ui/blur-text";

const QuoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 147 117"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M52.833 117H0L26.417 58.5 0 0h52.833L79.25 58.5 52.833 117zm67.917 0H67.917L94.334 58.5 67.917 0h52.833L147.167 58.5 120.75 117z" />
  </svg>
);

const TestimonialGuillaume = () => {
  return (
    <div className="py-12 md:py-24">
      <div className="container">
        <div className="bg-[#F7F7FD] rounded-2xl shadow-[0_32px_54px_rgba(61,59,117,0.07)] lg:flex lg:items-center lg:gap-x-20 p-8 md:p-12 lg:p-20">
          <div className="relative mx-auto lg:mx-0 flex-shrink-0 w-[300px] h-[300px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px]">
            <Image
              src="/images/account.jpg"
              alt="account"
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-0 inset-x-0 p-6 rounded-b-xl bg-gradient-to-t from-black/60 to-transparent text-white">
              <p className="font-bold text-lg text-white">OpenContainer</p>
              {/* <p className="text-sm">uSERP'te Dijital PR Yöneticisi</p> */}
            </div>
          </div>
          <div className="mt-8 lg:mt-0 flex-1">
            <QuoteIcon className="h-12 w-auto text-[#259c84] mb-6" />
            <blockquote className="text-brand-dark-navy text-[32px] md:text-[40px] font-medium leading-tight">
              <BlurText
                text='"OpenContainer, konteyner ticareti ve navlun yönetimini tek ekranda buluşturan dijital pazar yeridir. İş ortaklarınıza ulaşın, teklifleri karşılaştırın ve lojistik süreçlerinizi kolayca yönetin."'
                className="inline-block leading-12 text-left"
                delay={0}
                duration={0.25}
                stagger={0.02}
                translateY={6}
                blur={4}
                triggerOnView
                once={false}
              />
            </blockquote>
            <div className="mt-8">
              <a
                target="_blank"
                href="https://opencontainer.co"
                className="inline-block bg-brand-light-gray text-[#259c84] text-base font-medium py-[10px] px-5 rounded-lg hover:bg-opacity-80 transition-colors"
              >
                Daha fazla bilgi edinin
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialGuillaume;