'use client'
import CategoryFilter from '@/components/elements/CategoryFilter'
import Layout from "@/components/layout/Layout"
import SwiperGroupPayment7Slider from '@/components/slider/SwiperGroupPayment7Slider'
import { swiperGroupAnimate } from "@/util/swiperOption"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
export default function Destination6() {

	return (
		<>

			{/* <Layout headerStyle={1} footerStyle={1}> */}
				<main className="main">
					<section className="box-section box-breadcrumb background-body">
						<div className="container">
							<ul className="breadcrumbs">
								<li> <Link href="/">Home</Link><span className="arrow-right">
									<svg width={7} height={12} viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
										<path d="M1 11L6 6L1 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
									</svg></span></li>
								<li> <Link href="/destination-4">Destinations</Link><span className="arrow-right">
									<svg width={7} height={12} viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
										<path d="M1 11L6 6L1 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
									</svg></span></li>
								<li> <Link href="/destination-4">Europe</Link><span className="arrow-right">
									<svg width={7} height={12} viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
										<path d="M1 11L6 6L1 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
									</svg></span></li>
								<li> <span className="text-breadcrumb">Paris</span></li>
							</ul>
						</div>
					</section>
					<section className="section-box box-payments box-payments-destination background-4">
						<div className="container">
							<div className="row align-items-center">
								<div className="col-lg-7 mb-30">
									<div className="box-left-payment-destination"><span className="btn btn-tag-white">Easy payment</span>
										<h4 className="mb-25 mt-20 neutral-1000">Welcome to Paris</h4>
										<p className="text-xl-medium neutral-500 mb-35">Explore iconic landmarks and timeless beauty in the City of Light.</p>
										<div className="box-button-faq wow fadeInRight"> <Link className="btn btn-border-1" href="#">
											<svg width={25} height={24} viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
												<path d="M21.683 10.8508H19.0179V8.71402C19.0179 8.32514 18.7025 8.00986 18.3135 8.00986H14.5067C14.1537 6.93248 13.137 6.15961 11.9551 6.15961H10.7332V0.704156C10.7332 0.315281 10.4179 0 10.0289 0H5.11077C4.7218 0 4.40642 0.315281 4.40642 0.704156V6.15966H3.18458C1.70431 6.15966 0.5 7.36359 0.5 8.84348V21.3161C0.5 22.796 1.70431 24 3.18458 24H21.683C23.2363 24 24.5 22.7366 24.5 21.1838V13.667C24.5 12.1141 23.2363 10.8508 21.683 10.8508ZM23.0914 13.667V18.1203H9.16423V13.667C9.16423 12.8907 9.79602 12.259 10.5726 12.259H21.683C22.4596 12.259 23.0914 12.8906 23.0914 13.667ZM17.6092 10.8508H14.6464V9.41817H17.6092V10.8508ZM5.81506 1.40827H9.32459V6.15961H5.81506V1.40827ZM1.90864 21.3161V8.84348C1.90864 8.14012 2.48103 7.56792 3.18458 7.56792H11.9551C12.6261 7.56792 13.1855 8.09147 13.2283 8.75986C13.23 8.78592 13.2333 8.81147 13.2377 8.83659V10.8508H10.5725C9.01925 10.8508 7.75555 12.1141 7.75555 13.667V21.1838C7.75555 21.6965 7.89397 22.1772 8.13444 22.5917H3.18458C2.48103 22.5917 1.90864 22.0195 1.90864 21.3161ZM21.683 22.5917H11.9551H10.5726C9.79602 22.5917 9.16423 21.9601 9.16423 21.1838V19.5286H23.0914V21.1838C23.0914 21.9601 22.4596 22.5917 21.683 22.5917Z" />
											</svg>Tours Booking</Link><Link className="btn btn-border-1" href="#">
												<svg width={25} height={24} viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
													<path d="M24.1573 20.3428L21.8371 18.0226C21.692 17.8775 21.4907 17.803 21.286 17.8187L19.454 17.9597L17.7082 16.2138C21.0447 12.695 22.7359 8.98045 23.4604 7.02717C24.3769 4.55606 24.9922 1.55147 23.9705 0.529641C22.9486 -0.492188 19.944 0.123141 17.4729 1.03969C15.5196 1.76419 11.8051 3.45539 8.28622 6.79191L6.54041 5.04609L6.68131 3.21408C6.69706 3.00942 6.62258 2.80809 6.47745 2.66297L4.15723 0.342703C3.7003 -0.114234 2.95686 -0.114234 2.49997 0.342703L0.842703 1.99997C0.385766 2.45691 0.385766 3.20034 0.842703 3.65723L3.16287 5.97741C3.308 6.12253 3.50933 6.19702 3.71398 6.18127L5.546 6.04036L7.29181 7.78617C3.95534 11.305 2.26414 15.0195 1.53964 16.9728C0.623047 19.444 0.00776565 22.4486 1.02959 23.4704C2.05142 24.4922 5.05602 23.8769 7.52717 22.9604C9.4805 22.2358 13.195 20.5447 16.7138 17.2082L18.4596 18.954L18.3187 20.786C18.303 20.9907 18.3775 21.192 18.5226 21.3371L20.8428 23.6573C21.2997 24.1143 22.0431 24.1143 22.5 23.6573L24.1573 22.0001C24.6142 21.5431 24.6142 20.7997 24.1573 20.3428ZM15.4831 13.9887L16.3118 13.1601C17.5123 11.9595 17.6613 10.0997 16.7589 8.73544L18.8576 6.63675C19.6426 7.28344 20.5476 7.75266 21.5305 8.02191C20.6665 9.93492 19.1584 12.631 16.7128 15.2184L15.4831 13.9887ZM9.68262 14.8174C8.8602 13.995 8.86016 12.6567 9.68262 11.8343L10.5113 11.0056L13.4944 13.9887L12.6658 14.8174C11.8433 15.6398 10.5051 15.6398 9.68262 14.8174ZM11.5056 10.0113L12.3343 9.18262C13.1568 8.36016 14.495 8.3602 15.3174 9.18262C16.1399 10.0051 16.1399 11.3433 15.3174 12.1658L14.4888 12.9944L11.5056 10.0113ZM21.3924 1.46011C22.4186 1.33397 22.8726 1.45927 22.9751 1.52489C23.0407 1.62736 23.166 2.08144 23.0399 3.10767C22.9135 4.13639 22.5839 5.37333 22.0869 6.68484C22.0838 6.69286 22.0805 6.70153 22.0774 6.70959C21.0341 6.45741 20.0924 5.93236 19.33 5.16998C18.5676 4.40761 18.0421 3.46608 17.7899 2.42283C17.7982 2.41969 17.807 2.41622 17.8152 2.41313C19.1267 1.91611 20.3637 1.58653 21.3924 1.46011ZM16.4785 2.96934C16.7477 3.95227 17.2164 4.85756 17.8631 5.64253L15.7646 7.74108C14.4003 6.83873 12.5405 6.9877 11.3399 8.18827L10.5113 9.01692L9.28161 7.7872C11.8692 5.34141 14.5654 3.8333 16.4785 2.96934ZM2.00281 2.82863L3.32863 1.50281L5.25444 3.42862L5.1597 4.65975L3.92858 4.75448L2.00281 2.82863ZM9.51692 10.0113L8.68827 10.8399C7.48775 12.0404 7.33878 13.9003 8.24113 15.2645L6.14234 17.3633C5.35733 16.7166 4.45203 16.248 3.46916 15.9788C4.33306 14.0658 5.84122 11.3693 8.2872 8.78156L9.51692 10.0113ZM3.60767 22.5399C2.58144 22.666 2.12741 22.5407 2.02489 22.4751C1.95927 22.3726 1.83397 21.9186 1.96011 20.8924C2.08658 19.8637 2.41611 18.6267 2.91313 17.3152C2.91627 17.3069 2.91978 17.298 2.92292 17.2897C3.96608 17.542 4.90756 18.0676 5.66994 18.8301C6.43231 19.5925 6.95797 20.534 7.21034 21.5771C7.202 21.5803 7.19309 21.5838 7.1848 21.5869C5.87333 22.0839 4.63639 22.4135 3.60767 22.5399ZM8.52228 21.0303C8.25303 20.0474 7.78428 19.1418 7.13755 18.3569L9.23548 16.2589C10.5998 17.1613 12.4596 17.0123 13.6601 15.8118L14.4888 14.9831L15.7184 16.2128C13.1312 18.6583 10.4353 20.1663 8.52228 21.0303ZM21.6714 22.4972L19.7456 20.5715L19.8403 19.3403L21.0714 19.2457L22.9972 21.1714L21.6714 22.4972Z" fill="#737373" />
												</svg>Activities</Link><Link className="btn btn-border-1" href="#">
												<svg width={25} height={24} viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
													<g clipPath="url(#clip0_14_5659)">
														<path d="M22.0993 9.48724C22.7546 8.07953 23.2344 6.60443 23.2344 5.30109C23.2344 2.37799 20.8571 0 17.9351 0C15.8765 0 14.0884 1.1803 13.2114 2.89984C12.9056 2.87347 12.5963 2.85938 12.2891 2.85938C6.4469 2.85938 1.71875 7.58698 1.71875 13.4297C1.71875 19.2719 6.44635 24 12.2891 24C18.1312 24 22.8594 19.2724 22.8594 13.4297C22.8594 12.1126 22.623 10.7964 22.0993 9.48724ZM17.9351 1.40625C20.0817 1.40625 21.8281 3.15344 21.8281 5.30109C21.8281 8.07275 19.105 12.0386 17.9124 13.6425C16.3795 11.5587 14.0421 7.88324 14.0421 5.30109C14.0419 3.15344 15.7884 1.40625 17.9351 1.40625ZM5.55829 7.21765L10.2756 9.57623L9.73492 12.2796L7.8678 13.5244C7.67224 13.6547 7.55469 13.8743 7.55469 14.1094V17.1237L4.4613 18.1904C3.61389 16.8019 3.125 15.1719 3.125 13.4297C3.125 11.0349 4.04895 8.85187 5.55829 7.21765ZM5.32538 19.3799L8.48706 18.2897C8.77069 18.1919 8.96094 17.9249 8.96094 17.625V14.4857L10.7572 13.2881C10.9123 13.1847 11.0201 13.0239 11.0566 12.841L11.7597 9.32538C11.822 9.01447 11.6683 8.70044 11.3847 8.55872L6.66553 6.19904C8.388 4.85632 10.5206 4.17059 12.7355 4.27679C12.2907 6.53979 13.5248 9.23877 14.6724 11.2544L12.7307 12.865C12.4421 13.1045 12.3922 13.5282 12.6172 13.8281L13.8828 15.5156H11.0703C10.6819 15.5156 10.3672 15.8304 10.3672 16.2188V20.4375C10.3672 20.8259 10.6819 21.1406 11.0703 21.1406H14.2891L14.9481 22.1999C11.5292 23.2385 7.74127 22.203 5.32538 19.3799ZM16.2798 21.6782L15.2766 20.066C15.1483 19.8598 14.9227 19.7344 14.6797 19.7344H11.7734V16.9219H15.2891C15.8671 16.9219 16.1989 16.2599 15.8516 15.7969L14.1439 13.52L15.4059 12.4731C16.3904 14.0264 17.2787 15.1379 17.3618 15.241C17.6422 15.5889 18.1722 15.5903 18.4544 15.2439C18.5595 15.115 19.9385 13.409 21.1884 11.2328C21.3641 11.9469 21.4531 12.6819 21.4531 13.4297C21.4531 17.0532 19.3392 20.192 16.2798 21.6782Z" fill="#737373" />
														<path d="M17.9362 7.77264C19.2961 7.77264 20.4025 6.66595 20.4025 5.30585C20.4025 3.94556 19.296 2.83887 17.9362 2.83887C16.5763 2.83887 15.47 3.94556 15.47 5.30585C15.47 6.66595 16.5763 7.77264 17.9362 7.77264ZM17.9362 4.24512C18.5207 4.24512 18.9962 4.72101 18.9962 5.30585C18.9962 5.8905 18.5207 6.36639 17.9362 6.36639C17.3517 6.36639 16.8762 5.8905 16.8762 5.30585C16.8762 4.72101 17.3517 4.24512 17.9362 4.24512Z" fill="#737373" />
													</g>
													<defs>
														<clipPath id="clip0_14_5659">
															<rect width={24} height={24} fill="white" transform="translate(0.5)" />
														</clipPath>
													</defs>
												</svg>Destinations</Link><Link className="btn btn-border-1" href="#">
												<svg width={23} height={24} viewBox="0 0 23 24" xmlns="http://www.w3.org/2000/svg">
													<path d="M21.3584 8.29719H18.2269V5.1146C18.2269 4.72631 17.9121 4.41151 17.5238 4.41151H16.8207V2.78464C16.8207 1.24917 15.5715 0 14.036 0H8.96399C7.42848 0 6.17931 1.24917 6.17931 2.78464V4.41146H5.47621C5.08792 4.41146 4.77312 4.72626 4.77312 5.11456V8.29714H1.64157C1.25328 8.29714 0.938477 8.61194 0.938477 9.00024V23.2969C0.938477 23.6852 1.25328 24 1.64157 24H21.3584C21.7467 24 22.0615 23.6852 22.0615 23.2969V9.00029C22.0615 8.61199 21.7467 8.29719 21.3584 8.29719ZM7.5855 2.78464C7.5855 2.02454 8.2039 1.40619 8.96399 1.40619H14.036C14.7961 1.40619 15.4145 2.02454 15.4145 2.78464V4.41146H7.5855V2.78464ZM16.8207 5.81765V22.5938H15.3091V19.1664C15.3091 18.7781 14.9943 18.4633 14.606 18.4633H8.39397C8.00567 18.4633 7.69087 18.7781 7.69087 19.1664V22.5938H6.17931V5.81765H16.8207ZM12.2031 19.8695H13.9029V22.5938H12.2031V19.8695ZM10.7969 22.5938H9.09702V19.8695H10.7969V22.5938ZM2.34467 9.70338H4.77312V22.5938H2.34467V9.70338ZM20.6553 22.5938H18.2269V9.70338H20.6553V22.5938Z" fill="#737373" />
													<path d="M13.9167 16.5074C14.0066 16.9919 14.59 17.2332 14.9962 16.9545C15.487 16.6313 15.374 15.8643 14.8101 15.6974C14.31 15.5393 13.8084 15.9944 13.9167 16.5074Z" fill="#737373" />
													<path d="M11.0542 16.9132C11.5094 17.2882 12.2037 16.9594 12.2031 16.3699C12.2071 15.845 11.6297 15.4981 11.1686 15.7498C10.731 15.9757 10.6687 16.6065 11.0542 16.9132Z" fill="#737373" />
													<path d="M7.7047 16.5073C7.80257 17.0229 8.43733 17.2493 8.83997 16.9131C9.37207 16.4677 9.0163 15.6088 8.32483 15.6701C7.92313 15.7008 7.61597 16.1139 7.7047 16.5073Z" fill="#737373" />
													<path d="M15.2953 13.4197C15.1967 12.9041 14.5631 12.6777 14.16 13.0138C13.7038 13.3866 13.8899 14.1328 14.4684 14.2465C14.9499 14.3507 15.3988 13.9011 15.2953 13.4197Z" fill="#737373" />
													<path d="M10.8104 13.6949C10.9015 14.1797 11.4833 14.4207 11.8904 14.1421C12.381 13.8156 12.2691 13.0545 11.7042 12.8849C11.2039 12.7269 10.7026 13.1814 10.8104 13.6949Z" fill="#737373" />
													<path d="M7.70473 13.6949C7.79459 14.1794 8.37792 14.4207 8.78417 14.142C9.27531 13.8161 9.16309 13.0539 8.59809 12.8849C8.0979 12.7268 7.59631 13.1817 7.70473 13.6949Z" fill="#737373" />
													<path d="M15.3055 10.6759C15.2578 10.1532 14.6502 9.86548 14.2157 10.1603C13.7251 10.4833 13.8378 11.251 14.4019 11.4174C14.8712 11.5682 15.3607 11.165 15.3055 10.6759Z" fill="#737373" />
													<path d="M10.8105 10.8828C10.9014 11.3678 11.4834 11.6086 11.8905 11.33C12.3812 11.0037 12.269 10.2419 11.7039 10.0729C11.2037 9.91483 10.7028 10.3699 10.8105 10.8828Z" fill="#737373" />
													<path d="M7.70474 10.8829C7.79459 11.3675 8.37793 11.6088 8.78418 11.33C9.27513 11.0043 9.16291 10.242 8.59809 10.0729C8.09805 9.91476 7.59627 10.3699 7.70474 10.8829Z" fill="#737373" />
													<path d="M13.9167 8.07034C14.0065 8.55496 14.5901 8.79594 14.9962 8.51751C15.4868 8.19418 15.374 7.42724 14.8101 7.26037C14.31 7.10236 13.8084 7.55727 13.9167 8.07034Z" fill="#737373" />
													<path d="M10.8105 8.07036C10.9012 8.5547 11.4835 8.79623 11.8899 8.51753C12.3814 8.19213 12.2691 7.42993 11.7043 7.26039C11.2038 7.10238 10.703 7.55691 10.8105 8.07036Z" fill="#737373" />
													<path d="M7.70475 8.07034C7.79461 8.555 8.37794 8.79593 8.78419 8.51751C9.27505 8.19446 9.16213 7.42714 8.59811 7.26037C8.09764 7.10241 7.5968 7.55703 7.70475 8.07034Z" fill="#737373" />
												</svg>Hotels Booking</Link><Link className="btn btn-border-1" href="#">
												<svg width={24} height={18} viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg">
													<path d="M21.854 9.15913L19.1831 8.70509C19.1166 8.66834 19.0433 8.64256 18.9658 8.62897L16.929 5.96159C16.3602 5.21675 15.5476 4.78517 14.625 4.73258V2.63281C14.625 2.2445 14.3102 1.92969 13.9219 1.92969H11.3907V1.08594C11.3907 0.697625 11.0759 0.382812 10.6875 0.382812H5.10938C4.72106 0.382812 4.40625 0.697625 4.40625 1.08594V4.727H3.72656C2.84536 4.727 2.09475 5.23536 1.7678 6.05366L0.0502031 10.352C0.0170156 10.4349 0 10.5235 0 10.6129V14.852C0 15.2404 0.314812 15.5552 0.703125 15.5552H2.87381C3.13209 16.7331 4.18313 17.6176 5.4375 17.6176C6.69187 17.6176 7.74291 16.7331 8.00119 15.5552H15.9989C16.2571 16.7331 17.3082 17.6176 18.5625 17.6176C19.8169 17.6176 20.868 16.7331 21.1262 15.5552H23.2969C23.6852 15.5552 24 15.2404 24 14.852V11.7008C24 10.4395 23.0975 9.37053 21.854 9.15913ZM15.8113 6.81505L17.1878 8.61767H11.3341V6.14839L14.4329 6.13325C15.0021 6.13325 15.4658 6.36261 15.8113 6.81505ZM6.03614 6.14844H9.92784V8.61767H5.18198L6.03614 6.14844ZM13.2188 3.33594V4.727H11.3906V3.33594H13.2188ZM5.8125 1.78906H9.98438V4.727H5.8125V1.78906ZM5.4375 16.2114C4.76545 16.2114 4.21875 15.6647 4.21875 14.9927C4.21875 14.3206 4.76545 13.7739 5.4375 13.7739C6.10955 13.7739 6.65625 14.3206 6.65625 14.9927C6.65625 15.6647 6.10955 16.2114 5.4375 16.2114ZM18.5625 16.2114C17.8905 16.2114 17.3438 15.6647 17.3438 14.9927C17.3438 14.3206 17.8905 13.7739 18.5625 13.7739C19.2345 13.7739 19.7812 14.3206 19.7812 14.9927C19.7812 15.6647 19.2345 16.2114 18.5625 16.2114ZM21.0476 14.1489C20.6953 13.1143 19.7148 12.3676 18.5625 12.3676C17.4102 12.3676 16.4297 13.1143 16.0774 14.1489H7.92258C7.57031 13.1143 6.58978 12.3676 5.4375 12.3676C4.28522 12.3676 3.30469 13.1143 2.95242 14.1489H1.40625V12.0864H1.45308C1.84139 12.0864 2.1562 11.7716 2.1562 11.3833C2.1562 10.995 1.84139 10.6802 1.45308 10.6802H1.43339L3.07359 6.57552C3.18427 6.29862 3.42834 6.13325 3.72656 6.13325H4.55339L3.5303 9.09097C3.45595 9.30589 3.49017 9.54345 3.62208 9.7287C3.75398 9.91391 3.96736 10.0239 4.1948 10.0239H18.5503L21.6183 10.5455C22.0667 10.6217 22.4085 10.9285 22.5373 11.3364H22.5234C22.1351 11.3364 21.8203 11.6512 21.8203 12.0395C21.8203 12.4278 22.1351 12.7426 22.5234 12.7426H22.5938V14.1489H21.0476Z" fill="#737373" />
												</svg>Rental Car</Link><Link className="btn btn-border-1" href="#">
												<svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													<path d="M23.2799 22.5938H20.801V6.32812C20.801 5.93981 20.4862 5.625 20.0979 5.625H17.6538V3.51562C17.6538 3.12731 17.339 2.8125 16.9507 2.8125H15.5842V0.703125C15.5842 0.314812 15.2694 0 14.881 0H9.11898C8.73067 0 8.41586 0.314812 8.41586 0.703125V2.8125H7.04931C6.661 2.8125 6.34618 3.12731 6.34618 3.51562V5.625H3.90217C3.51386 5.625 3.19904 5.93981 3.19904 6.32812V22.5938H0.720154C0.331841 22.5938 0.0170288 22.9086 0.0170288 23.2969C0.0170288 23.6852 0.331841 24 0.720154 24H23.2798C23.6681 24 23.983 23.6852 23.983 23.2969C23.983 22.9086 23.6682 22.5938 23.2799 22.5938ZM9.82211 1.40625H14.1779V2.8125H9.82211V1.40625ZM7.75243 4.21875H16.2476V5.625H7.75243V4.21875ZM11.2969 22.5938H8.48439V18.3871H11.2969V22.5938ZM15.5156 22.5938H12.7031V18.3871H15.5156V22.5938ZM19.3947 22.5938H16.9219V17.684C16.9219 17.2957 16.6071 16.9809 16.2188 16.9809H7.78126C7.39295 16.9809 7.07814 17.2957 7.07814 17.684V22.5938H4.60529V7.03125H19.3947V22.5938Z" fill="#737373" />
													<path d="M16.2188 15.2226C16.6071 15.2226 16.9219 14.9078 16.9219 14.5195V13.5C16.9219 13.1117 16.6071 12.7969 16.2188 12.7969C15.8304 12.7969 15.5156 13.1117 15.5156 13.5V14.5195C15.5156 14.9078 15.8304 15.2226 16.2188 15.2226Z" fill="#737373" />
													<path d="M13.4062 15.2226C13.7946 15.2226 14.1094 14.9078 14.1094 14.5195V13.5C14.1094 13.1117 13.7946 12.7969 13.4062 12.7969C13.0179 12.7969 12.7031 13.1117 12.7031 13.5V14.5195C12.7031 14.9078 13.0179 15.2226 13.4062 15.2226Z" fill="#737373" />
													<path d="M10.5938 15.2226C10.9821 15.2226 11.2969 14.9078 11.2969 14.5195V13.5C11.2969 13.1117 10.9821 12.7969 10.5938 12.7969C10.2054 12.7969 9.89062 13.1117 9.89062 13.5V14.5195C9.89062 14.9078 10.2054 15.2226 10.5938 15.2226Z" fill="#737373" />
													<path d="M7.78125 15.2226C8.16956 15.2226 8.48438 14.9078 8.48438 14.5195V13.5C8.48438 13.1117 8.16956 12.7969 7.78125 12.7969C7.39294 12.7969 7.07812 13.1117 7.07812 13.5V14.5195C7.07812 14.9078 7.39294 15.2226 7.78125 15.2226Z" fill="#737373" />
													<path d="M16.2188 11.4726C16.6071 11.4726 16.9219 11.1578 16.9219 10.7695V9.75C16.9219 9.36169 16.6071 9.04688 16.2188 9.04688C15.8304 9.04688 15.5156 9.36169 15.5156 9.75V10.7695C15.5156 11.1578 15.8304 11.4726 16.2188 11.4726Z" fill="#737373" />
													<path d="M13.4062 11.4726C13.7946 11.4726 14.1094 11.1578 14.1094 10.7695V9.75C14.1094 9.36169 13.7946 9.04688 13.4062 9.04688C13.0179 9.04688 12.7031 9.36169 12.7031 9.75V10.7695C12.7031 11.1578 13.0179 11.4726 13.4062 11.4726Z" fill="#737373" />
													<path d="M10.5938 11.4726C10.9821 11.4726 11.2969 11.1578 11.2969 10.7695V9.75C11.2969 9.36169 10.9821 9.04688 10.5938 9.04688C10.2054 9.04688 9.89062 9.36169 9.89062 9.75V10.7695C9.89062 11.1578 10.2054 11.4726 10.5938 11.4726Z" fill="#737373" />
													<path d="M7.78125 11.4726C8.16956 11.4726 8.48438 11.1578 8.48438 10.7695V9.75C8.48438 9.36169 8.16956 9.04688 7.78125 9.04688C7.39294 9.04688 7.07812 9.36169 7.07812 9.75V10.7695C7.07812 11.1578 7.39294 11.4726 7.78125 11.4726Z" fill="#737373" />
												</svg>Property</Link><Link className="btn btn-border-1" href="#">
												<svg width={18} height={24} viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
													<path d="M17.6719 11.0625V0.703125C17.6719 0.314812 17.3571 0 16.9688 0H1.03125C0.642937 0 0.328125 0.314812 0.328125 0.703125V11.0625C0.328125 11.249 0.402234 11.4278 0.534094 11.5597L0.974391 12L0.534094 12.4403C0.402234 12.5722 0.328125 12.751 0.328125 12.9375V23.2969C0.328125 23.6852 0.642937 24 1.03125 24H16.9688C17.3571 24 17.6719 23.6852 17.6719 23.2969V12.9375C17.6719 12.751 17.5978 12.5722 17.4659 12.4403L17.0256 12L17.466 11.5597C17.5978 11.4278 17.6719 11.249 17.6719 11.0625ZM16.2656 10.7713L15.5341 11.5028C15.2595 11.7774 15.2595 12.2226 15.5341 12.4972L16.2656 13.2287V22.5938H1.73438V13.2287L2.46591 12.4972C2.7405 12.2226 2.7405 11.7774 2.46591 11.5028L1.73438 10.7713V1.40625H16.2656V10.7713Z" fill="#737373" />
													<path d="M4.32536 7.58274L5.43443 8.56618C5.66088 8.76699 5.99041 8.80032 6.25249 8.64901L9.58015 6.72779L9.44716 8.78991C9.42218 9.17743 9.71608 9.51183 10.1036 9.53687C10.4911 9.5619 10.8255 9.26794 10.8506 8.88043L11.0439 5.88277L13.5596 4.4303C13.8959 4.23615 14.0111 3.80612 13.8169 3.46983C13.6227 3.13351 13.1928 3.01833 12.8565 3.21249L10.3407 4.66496L7.64801 3.33357C7.29986 3.16149 6.87822 3.30413 6.70605 3.65222C6.53393 4.00032 6.67661 4.42205 7.02471 4.59418L8.87702 5.51007L5.98825 7.17788L5.25836 6.53063C4.96783 6.27305 4.52346 6.29968 4.26579 6.59021C4.00816 6.88069 4.03483 7.32507 4.32536 7.58274Z" fill="#737373" />
													<path d="M3.84375 15.5625H14.1562C14.5446 15.5625 14.8594 15.2477 14.8594 14.8594C14.8594 14.4711 14.5446 14.1562 14.1562 14.1562H3.84375C3.45544 14.1562 3.14062 14.4711 3.14062 14.8594C3.14062 15.2477 3.45544 15.5625 3.84375 15.5625Z" fill="#737373" />
													<path d="M3.84375 18.375H9C9.38831 18.375 9.70312 18.0602 9.70312 17.6719C9.70312 17.2836 9.38831 16.9688 9 16.9688H3.84375C3.45544 16.9688 3.14062 17.2836 3.14062 17.6719C3.14062 18.0602 3.45544 18.375 3.84375 18.375Z" fill="#737373" />
													<path d="M3.84375 21.1875H9C9.38831 21.1875 9.70312 20.8727 9.70312 20.4844C9.70312 20.0961 9.38831 19.7812 9 19.7812H3.84375C3.45544 19.7812 3.14062 20.0961 3.14062 20.4844C3.14062 20.8727 3.45544 21.1875 3.84375 21.1875Z" fill="#737373" />
													<path d="M4.78125 12.7031H5.71875C6.10706 12.7031 6.42188 12.3883 6.42188 12C6.42188 11.6117 6.10706 11.2969 5.71875 11.2969H4.78125C4.39294 11.2969 4.07812 11.6117 4.07812 12C4.07812 12.3883 4.39294 12.7031 4.78125 12.7031Z" fill="#737373" />
													<path d="M9.46875 11.2969H8.53125C8.14294 11.2969 7.82812 11.6117 7.82812 12C7.82812 12.3883 8.14294 12.7031 8.53125 12.7031H9.46875C9.85706 12.7031 10.1719 12.3883 10.1719 12C10.1719 11.6117 9.85706 11.2969 9.46875 11.2969Z" fill="#737373" />
													<path d="M13.2188 11.2969H12.2812C11.8929 11.2969 11.5781 11.6117 11.5781 12C11.5781 12.3883 11.8929 12.7031 12.2812 12.7031H13.2188C13.6071 12.7031 13.9219 12.3883 13.9219 12C13.9219 11.6117 13.6071 11.2969 13.2188 11.2969Z" fill="#737373" />
													<path d="M12.75 16.9688C11.5869 16.9688 10.6406 17.915 10.6406 19.0781C10.6406 20.2412 11.5869 21.1875 12.75 21.1875C13.9131 21.1875 14.8594 20.2412 14.8594 19.0781C14.8594 17.915 13.9131 16.9688 12.75 16.9688ZM12.75 19.7812C12.3623 19.7812 12.0469 19.4658 12.0469 19.0781C12.0469 18.6904 12.3623 18.375 12.75 18.375C13.1377 18.375 13.4531 18.6904 13.4531 19.0781C13.4531 19.4658 13.1377 19.7812 12.75 19.7812Z" fill="#737373" />
												</svg>Tickets Booking</Link></div>
									</div>
								</div>
								<div className="col-lg-5">
									<div className="box-image-payment-2">
										<div className="row align-items-center">
											<div className="col-4 mb-30"><img className="bdrd8 w-100" src="/assets/imgs/page/destination/paris.png" alt="StayChain" /></div>
											<div className="col-4 mb-30"><img className="bdrd8 w-100 mb-15" src="/assets/imgs/page/destination/paris2.png" alt="StayChain" /><img className="bdrd8 w-100" src="/assets/imgs/page/destination/paris3.png" alt="StayChain" /></div>
											<div className="col-4 mb-30"><img className="bdrd8 w-100 mb-15" src="/assets/imgs/page/destination/paris4.png" alt="StayChain" /><img className="bdrd8 w-100" src="/assets/imgs/page/destination/paris5.png" alt="StayChain" /></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="section-box box-logos-destination background-body">
						<div className="container">
							<div className="box-swiper pt-40">
								<div className="swiper-container swiper-group-payment-7 wow fadeInUp">
									<SwiperGroupPayment7Slider />
								</div>
							</div>
						</div>
					</section>
					<section className="box-section box-welcome-destination background-card">
						<div className="container">
							<div className="row">
								<div className="col-lg-5">
									<div className="row">
										<div className="col-6">
											<div className="box-welcome-image-1"> <img src="/assets/imgs/page/destination/welcome.png" alt="Travile" /><img src="/assets/imgs/page/destination/welcome2.png" alt="Travile" /></div>
										</div>
										<div className="col-6">
											<div className="box-welcome-image-2">   <img src="/assets/imgs/page/destination/welcome3.png" alt="Travile" /><img src="/assets/imgs/page/destination/welcome4.png" alt="Travile" /></div>
										</div>
									</div>
								</div>
								<div className="col-lg-7">
									<h2 className="neutral-1000 mb-15">Overview</h2>
									<p className="text-xl-medium neutral-500 location-text">
										<svg width={18} height={24} viewBox="0 0 18 24" xmlns="http://www.w3.org/2000/svg">
											<path d="M9 0C4.20726 0 0.308105 3.89916 0.308105 8.69184C0.308105 14.6397 8.0865 23.3715 8.41767 23.7404C8.72873 24.0868 9.27182 24.0862 9.58232 23.7404C9.9135 23.3715 17.6919 14.6397 17.6919 8.69184C17.6918 3.89916 13.7927 0 9 0ZM9 13.065C6.58865 13.065 4.62693 11.1032 4.62693 8.69184C4.62693 6.2805 6.5887 4.31878 9 4.31878C11.4113 4.31878 13.373 6.28055 13.373 8.69189C13.373 11.1032 11.4113 13.065 9 13.065Z" />
										</svg>France, Europe
									</p>
									<p className="text-xl-medium neutral-500 num-tours-text">
										<svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path d="M21.183 10.8508H18.5179V8.71402C18.5179 8.32514 18.2025 8.00986 17.8135 8.00986H14.0067C13.6537 6.93248 12.637 6.15961 11.4551 6.15961H10.2332V0.704156C10.2332 0.315281 9.91791 0 9.52894 0H4.61077C4.2218 0 3.90642 0.315281 3.90642 0.704156V6.15966H2.68458C1.20431 6.15966 0 7.36359 0 8.84348V21.3161C0 22.796 1.20431 24 2.68458 24H21.183C22.7363 24 24 22.7366 24 21.1838V13.667C24 12.1141 22.7363 10.8508 21.183 10.8508ZM22.5914 13.667V18.1203H8.66423V13.667C8.66423 12.8907 9.29602 12.259 10.0726 12.259H21.183C21.9596 12.259 22.5914 12.8906 22.5914 13.667ZM17.1092 10.8508H14.1464V9.41817H17.1092V10.8508ZM5.31506 1.40827H8.82459V6.15961H5.31506V1.40827ZM1.40864 21.3161V8.84348C1.40864 8.14012 1.98103 7.56792 2.68458 7.56792H11.4551C12.1261 7.56792 12.6855 8.09147 12.7283 8.75986C12.73 8.78592 12.7333 8.81147 12.7377 8.83659V10.8508H10.0725C8.51925 10.8508 7.25555 12.1141 7.25555 13.667V21.1838C7.25555 21.6965 7.39397 22.1772 7.63444 22.5917H2.68458C1.98103 22.5917 1.40864 22.0195 1.40864 21.3161ZM21.183 22.5917H11.4551H10.0726C9.29602 22.5917 8.66423 21.9601 8.66423 21.1838V19.5286H22.5914V21.1838C22.5914 21.9601 21.9596 22.5917 21.183 22.5917Z" />
										</svg>356 Tours,
									</p>
									<p className="text-xl-medium neutral-500 num-activities-text">
										<svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path d="M23.6573 20.3428L21.3371 18.0226C21.192 17.8775 20.9907 17.803 20.786 17.8187L18.954 17.9597L17.2082 16.2138C20.5447 12.695 22.2359 8.98045 22.9604 7.02717C23.8769 4.55606 24.4922 1.55147 23.4705 0.529641C22.4486 -0.492188 19.444 0.123141 16.9729 1.03969C15.0196 1.76419 11.3051 3.45539 7.78622 6.79191L6.04041 5.04609L6.18131 3.21408C6.19706 3.00942 6.12258 2.80809 5.97745 2.66297L3.65723 0.342703C3.2003 -0.114234 2.45686 -0.114234 1.99997 0.342703L0.342703 1.99997C-0.114234 2.45691 -0.114234 3.20034 0.342703 3.65723L2.66287 5.97741C2.808 6.12253 3.00933 6.19702 3.21398 6.18127L5.046 6.04036L6.79181 7.78617C3.45534 11.305 1.76414 15.0195 1.03964 16.9728C0.123047 19.444 -0.492234 22.4486 0.529594 23.4704C1.55142 24.4922 4.55602 23.8769 7.02717 22.9604C8.9805 22.2358 12.695 20.5447 16.2138 17.2082L17.9596 18.954L17.8187 20.786C17.803 20.9907 17.8775 21.192 18.0226 21.3371L20.3428 23.6573C20.7997 24.1143 21.5431 24.1143 22 23.6573L23.6573 22.0001C24.1142 21.5431 24.1142 20.7997 23.6573 20.3428ZM14.9831 13.9887L15.8118 13.1601C17.0123 11.9595 17.1613 10.0997 16.2589 8.73544L18.3576 6.63675C19.1426 7.28344 20.0476 7.75266 21.0305 8.02191C20.1665 9.93492 18.6584 12.631 16.2128 15.2184L14.9831 13.9887ZM9.18262 14.8174C8.3602 13.995 8.36016 12.6567 9.18262 11.8343L10.0113 11.0056L12.9944 13.9887L12.1658 14.8174C11.3433 15.6398 10.0051 15.6398 9.18262 14.8174ZM11.0056 10.0113L11.8343 9.18262C12.6568 8.36016 13.995 8.3602 14.8174 9.18262C15.6399 10.0051 15.6399 11.3433 14.8174 12.1658L13.9888 12.9944L11.0056 10.0113ZM20.8924 1.46011C21.9186 1.33397 22.3726 1.45927 22.4751 1.52489C22.5407 1.62736 22.666 2.08144 22.5399 3.10767C22.4135 4.13639 22.0839 5.37333 21.5869 6.68484C21.5838 6.69286 21.5805 6.70153 21.5774 6.70959C20.5341 6.45741 19.5924 5.93236 18.83 5.16998C18.0676 4.40761 17.5421 3.46608 17.2899 2.42283C17.2982 2.41969 17.307 2.41622 17.3152 2.41313C18.6267 1.91611 19.8637 1.58653 20.8924 1.46011ZM15.9785 2.96934C16.2477 3.95227 16.7164 4.85756 17.3631 5.64253L15.2646 7.74108C13.9003 6.83873 12.0405 6.9877 10.8399 8.18827L10.0113 9.01692L8.78161 7.7872C11.3692 5.34141 14.0654 3.8333 15.9785 2.96934ZM1.50281 2.82863L2.82863 1.50281L4.75444 3.42862L4.6597 4.65975L3.42858 4.75448L1.50281 2.82863ZM9.01692 10.0113L8.18827 10.8399C6.98775 12.0404 6.83878 13.9003 7.74113 15.2645L5.64234 17.3633C4.85733 16.7166 3.95203 16.248 2.96916 15.9788C3.83306 14.0658 5.34122 11.3693 7.7872 8.78156L9.01692 10.0113ZM3.10767 22.5399C2.08144 22.666 1.62741 22.5407 1.52489 22.4751C1.45927 22.3726 1.33397 21.9186 1.46011 20.8924C1.58658 19.8637 1.91611 18.6267 2.41313 17.3152C2.41627 17.3069 2.41978 17.298 2.42292 17.2897C3.46608 17.542 4.40756 18.0676 5.16994 18.8301C5.93231 19.5925 6.45797 20.534 6.71034 21.5771C6.702 21.5803 6.69309 21.5838 6.6848 21.5869C5.37333 22.0839 4.13639 22.4135 3.10767 22.5399ZM8.02228 21.0303C7.75303 20.0474 7.28428 19.1418 6.63755 18.3569L8.73548 16.2589C10.0998 17.1613 11.9596 17.0123 13.1601 15.8118L13.9888 14.9831L15.2184 16.2128C12.6312 18.6583 9.9353 20.1663 8.02228 21.0303ZM21.1714 22.4972L19.2456 20.5715L19.3403 19.3403L20.5714 19.2457L22.4972 21.1714L21.1714 22.4972Z" />
										</svg>248 Activities
									</p>
									<p className="text-xl-medium neutral-1000 mt-55 mb-45">Paris, the City of Light, effortlessly blends its rich history with contemporary flair, offering a captivating tapestry of experiences for every visitor. Its iconic monument-lined boulevards, adorned with architectural marvels like the Eiffel Tower and Notre-Dame Cathedral, stand as timeless symbols of beauty and grandeur. Amidst this classical backdrop, Paris pulsates with modern energy, fueled by a dynamic blend of culture, cuisine, and innovation.</p>
									<div className="box-buttons d-flex align-items-center"> <Link className="btn btn-black-lg mr-10" href="#">Best Time To Visit
										<svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
											<path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
										</svg></Link><Link className="btn btn-brand-secondary" href="#">Trending Tours
											<svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
												<path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
											</svg></Link></div>
								</div>
							</div>
						</div>
					</section>
					<section className="section-box box-top-search-destination background-body">
						<div className="container">
							<div className="text-center wow fadeInUp">
								<h2 className="neutral-1000 wow fadeInUp">Must-see Attractions</h2>
								<p className="text-xl-medium neutral-500 wow fadeInUp">Favorite destinations of professional tourists</p>
							</div>
							<div className="box-list-populars">
								<div className="row">
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="/destination">Venice</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="/destination">356 Tours</Link></div>
													<div className="card-button"> <Link href="/destination">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination2.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="/destination">Amsterdam</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="/destination">356 Tours</Link></div>
													<div className="card-button"> <Link href="/destination">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination3.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="/destination">Budapest</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="/destination">356 Tours</Link></div>
													<div className="card-button"> <Link href="/destination">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination4.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="/destination">Lisbon</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="/destination">356 Tours</Link></div>
													<div className="card-button"> <Link href="/destination">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination5.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="/destination">London</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="/destination">356 Tours</Link></div>
													<div className="card-button"> <Link href="/destination">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination6.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="/destination">Ottawa</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="/destination">356 Tours</Link></div>
													<div className="card-button"> <Link href="/destination">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination7.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="/destination">Paris</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="/destination">356 Tours</Link></div>
													<div className="card-button"> <Link href="/destination">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-3 col-sm-6">
										<div className="card-popular card-top-destination background-card wow fadeInUp">
											<div className="card-image"> <img src="/assets/imgs/page/homepage6/destination8.png" alt="StayChain" /></div>
											<div className="card-info"> <Link className="card-title" href="/destination">Paris</Link>
												<div className="card-meta">
													<div className="meta-links"> <Link className="text-tour" href="/destination">356 Tours</Link></div>
													<div className="card-button"> <Link href="/destination">
														<svg width={10} height={10} viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
															<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" strokeLinecap="round" strokeLinejoin="round" />
														</svg></Link></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="section-box box-why-book-travila-4 background-body">
						<div className="container">
							<div className="row align-items-center">
								<div className="col-lg-6 mb-30"><span className="btn btn-brand-secondary wow fadeInUp"> <img className="mr-10" src="/assets/imgs/page/homepage4/earth.svg" alt="Travile" />Paris Travel Guide</span>
									<h2 className="mt-15 mb-15 neutral-1000 wow fadeInUp">What to know before visiting Paris</h2>
									<p className="text-xl-medium neutral-1000 mb-30 wow fadeInUp">Paris is known around the world as the “capital of love,” and even if you don't understand the history of Paris at all</p>
									<div className="row">
										<div className="col-sm-6 mb-15"> <span className="text-xl-medium neutral-1000">Language: <strong>French</strong></span></div>
										<div className="col-sm-6 mb-15"> <span className="text-xl-medium neutral-1000">Peak Season: <strong>June - October</strong></span></div>
										<div className="col-sm-6 mb-15"> <span className="text-xl-medium neutral-1000">Time Zone: <strong>UTC +1</strong></span></div>
										<div className="col-sm-6 mb-15"> <span className="text-xl-medium neutral-1000">Currency: <strong>Euros</strong></span></div>
									</div>
								</div>
								<div className="col-lg-6 mb-30">
									<div className="row align-items-center">
										<div className="col-lg-6 col-sm-6">
											<div className="card-why card-why-2 background-1 wow fadeInUp">
												<div className="card-image"> <img src="/assets/imgs/page/homepage6/experience.png" alt="StayChain" /></div>
												<div className="card-info">
													<h6 className="text-xl-bold neutral-1000">Useful Info</h6>
												</div>
											</div>
											<div className="card-why card-why-2 background-3 wow fadeInUp">
												<div className="card-image">
													<svg width={48} height={46} viewBox="0 0 48 46" xmlns="http://www.w3.org/2000/svg">
														<g clipPath="url(#clip0_21_10174)">
															<mask id="mask0_21_10174" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x={0} y={0} width={48} height={46}>
																<path d="M44.819 32.7853C42.7514 37.691 38.9274 41.3068 33.347 43.6326C27.7666 45.9585 22.5864 45.6066 17.8064 42.5772C13.0264 39.5478 8.40207 35.932 3.93332 31.7298C-0.535422 27.5277 -0.980074 22.9347 2.59937 17.9507C6.17881 12.9668 10.8032 8.35425 16.4725 4.11303C22.1418 -0.128193 28.8227 -1.01748 36.5151 1.44516C44.2076 3.90781 48.0316 8.52038 47.9871 15.2829C47.9427 22.0454 46.8866 27.8795 44.819 32.7853Z" fill="white" />
															</mask>
															<g mask="url(#mask0_21_10174)">
																<path d="M44.819 32.7853C42.7514 37.691 38.9274 41.3068 33.347 43.6326C27.7666 45.9585 22.5864 45.6066 17.8064 42.5772C13.0264 39.5478 8.40207 35.932 3.93332 31.7298C-0.535422 27.5277 -0.980074 22.9347 2.59937 17.9507C6.17881 12.9668 10.8032 8.35425 16.4725 4.11303C22.1418 -0.128193 28.8227 -1.01748 36.5151 1.44516C44.2076 3.90781 48.0316 8.52038 47.9871 15.2829C47.9427 22.0454 46.8866 27.8795 44.819 32.7853Z" fill="#E4F9F9" />
															</g>
														</g>
														<path d="M35.5625 21.75V7.9375C35.5625 7.41975 35.1428 7 34.625 7H13.375C12.8572 7 12.4375 7.41975 12.4375 7.9375V21.75C12.4375 21.9986 12.5363 22.2371 12.7121 22.4129L13.2992 23L12.7121 23.5871C12.5363 23.7629 12.4375 24.0014 12.4375 24.25V38.0625C12.4375 38.5803 12.8572 39 13.375 39H34.625C35.1428 39 35.5625 38.5803 35.5625 38.0625V24.25C35.5625 24.0014 35.4637 23.7629 35.2879 23.5871L34.7008 23L35.2879 22.4129C35.4637 22.2371 35.5625 21.9986 35.5625 21.75ZM33.6875 21.3617L32.7121 22.3371C32.346 22.7032 32.346 23.2968 32.7121 23.6629L33.6875 24.6383V37.125H14.3125V24.6383L15.2879 23.6629C15.654 23.2967 15.654 22.7032 15.2879 22.3371L14.3125 21.3617V8.875H33.6875V21.3617Z" fill="black" />
														<path d="M17.7672 17.1101L19.2459 18.4214C19.5478 18.6891 19.9872 18.7336 20.3367 18.5318L24.7735 15.9702L24.5962 18.7197C24.5629 19.2364 24.9548 19.6822 25.4715 19.7156C25.9882 19.749 26.434 19.3571 26.4674 18.8404L26.7252 14.8435L30.0795 12.9069C30.5279 12.648 30.6815 12.0746 30.4226 11.6262C30.1637 11.1778 29.5903 11.0242 29.142 11.2831L25.7877 13.2197L22.1973 11.4446C21.7332 11.2151 21.171 11.4053 20.9414 11.8694C20.7119 12.3336 20.9022 12.8959 21.3663 13.1254L23.836 14.3466L19.9843 16.5703L19.0112 15.7073C18.6238 15.3639 18.0313 15.3994 17.6877 15.7867C17.3442 16.1741 17.3798 16.7666 17.7672 17.1101Z" fill="black" />
														<path d="M17.125 27.75H30.875C31.3928 27.75 31.8125 27.3303 31.8125 26.8125C31.8125 26.2947 31.3928 25.875 30.875 25.875H17.125C16.6072 25.875 16.1875 26.2947 16.1875 26.8125C16.1875 27.3303 16.6072 27.75 17.125 27.75Z" fill="black" />
														<path d="M17.125 31.5H24C24.5178 31.5 24.9375 31.0803 24.9375 30.5625C24.9375 30.0447 24.5178 29.625 24 29.625H17.125C16.6072 29.625 16.1875 30.0447 16.1875 30.5625C16.1875 31.0803 16.6072 31.5 17.125 31.5Z" fill="black" />
														<path d="M17.125 35.25H24C24.5178 35.25 24.9375 34.8303 24.9375 34.3125C24.9375 33.7947 24.5178 33.375 24 33.375H17.125C16.6072 33.375 16.1875 33.7947 16.1875 34.3125C16.1875 34.8303 16.6072 35.25 17.125 35.25Z" fill="black" />
														<path d="M18.375 23.9375H19.625C20.1428 23.9375 20.5625 23.5178 20.5625 23C20.5625 22.4822 20.1428 22.0625 19.625 22.0625H18.375C17.8572 22.0625 17.4375 22.4822 17.4375 23C17.4375 23.5178 17.8572 23.9375 18.375 23.9375Z" fill="black" />
														<path d="M24.625 22.0625H23.375C22.8572 22.0625 22.4375 22.4822 22.4375 23C22.4375 23.5178 22.8572 23.9375 23.375 23.9375H24.625C25.1428 23.9375 25.5625 23.5178 25.5625 23C25.5625 22.4822 25.1428 22.0625 24.625 22.0625Z" fill="black" />
														<path d="M29.625 22.0625H28.375C27.8572 22.0625 27.4375 22.4822 27.4375 23C27.4375 23.5178 27.8572 23.9375 28.375 23.9375H29.625C30.1428 23.9375 30.5625 23.5178 30.5625 23C30.5625 22.4822 30.1428 22.0625 29.625 22.0625Z" fill="black" />
														<path d="M29 29.625C27.4492 29.625 26.1875 30.8867 26.1875 32.4375C26.1875 33.9883 27.4492 35.25 29 35.25C30.5508 35.25 31.8125 33.9883 31.8125 32.4375C31.8125 30.8867 30.5508 29.625 29 29.625ZM29 33.375C28.4831 33.375 28.0625 32.9544 28.0625 32.4375C28.0625 31.9206 28.4831 31.5 29 31.5C29.5169 31.5 29.9375 31.9206 29.9375 32.4375C29.9375 32.9544 29.5169 33.375 29 33.375Z" fill="black" />
														<defs>
															<clipPath id="clip0_21_10174">
																<rect width={48} height="45.2958" fill="white" />
															</clipPath>
														</defs>
													</svg>
												</div>
												<div className="card-info">
													<h6 className="text-xl-bold neutral-1000">Weather</h6>
												</div>
											</div>
										</div>
										<div className="col-lg-6 col-sm-6">
											<div className="card-why card-why-2 background-2 wow fadeInUp">
												<div className="card-image">
													<svg width={48} height={46} viewBox="0 0 48 46" xmlns="http://www.w3.org/2000/svg">
														<g clipPath="url(#clip0_21_16353)">
															<mask id="mask0_21_16353" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x={0} y={0} width={48} height={46}>
																<path d="M44.819 32.7853C42.7514 37.691 38.9274 41.3068 33.347 43.6326C27.7666 45.9585 22.5864 45.6066 17.8064 42.5772C13.0264 39.5478 8.40207 35.932 3.93332 31.7298C-0.535422 27.5277 -0.980074 22.9347 2.59937 17.9507C6.17881 12.9668 10.8032 8.35425 16.4725 4.11303C22.1418 -0.128193 28.8227 -1.01748 36.5151 1.44516C44.2076 3.90781 48.0316 8.52038 47.9871 15.2829C47.9427 22.0454 46.8866 27.8795 44.819 32.7853Z" fill="white" />
															</mask>
															<g mask="url(#mask0_21_16353)">
																<path d="M44.819 32.7853C42.7514 37.691 38.9274 41.3068 33.347 43.6326C27.7666 45.9585 22.5864 45.6066 17.8064 42.5772C13.0264 39.5478 8.40207 35.932 3.93332 31.7298C-0.535422 27.5277 -0.980074 22.9347 2.59937 17.9507C6.17881 12.9668 10.8032 8.35425 16.4725 4.11303C22.1418 -0.128193 28.8227 -1.01748 36.5151 1.44516C44.2076 3.90781 48.0316 8.52038 47.9871 15.2829C47.9427 22.0454 46.8866 27.8795 44.819 32.7853Z" fill="#E3F0FF" />
															</g>
														</g>
														<path d="M29.6484 14.5312H26.8203V8.875H27.7656C28.2834 8.875 28.7031 8.45525 28.7031 7.9375C28.7031 7.41975 28.2834 7 27.7656 7H20.2344C19.7166 7 19.2969 7.41975 19.2969 7.9375C19.2969 8.45525 19.7166 8.875 20.2344 8.875H21.1797V14.5312H18.3516C16.7964 14.5312 15.5312 15.7964 15.5312 17.3516V32.4141C15.5312 33.7144 16.4161 34.8114 17.615 35.1362C17.4859 35.4592 17.4141 35.8111 17.4141 36.1797C17.4141 37.7348 18.6793 39 20.2344 39C21.7895 39 23.0547 37.7348 23.0547 36.1797C23.0547 35.8482 22.9968 35.5301 22.8912 35.2344H25.1087C25.0032 35.5301 24.9452 35.8482 24.9452 36.1797C24.9452 37.7348 26.2104 39 27.7656 39C29.3207 39 30.5859 37.7348 30.5859 36.1797C30.5859 35.8111 30.5141 35.4592 30.3849 35.1362C31.5839 34.8114 32.4687 33.7144 32.4687 32.4141V17.3516C32.4687 15.7964 31.2036 14.5312 29.6484 14.5312ZM23.0547 8.875H24.9453V14.5312H23.0547V8.875ZM21.1797 36.1797C21.1797 36.7009 20.7556 37.125 20.2344 37.125C19.7131 37.125 19.2891 36.7009 19.2891 36.1797C19.2891 35.6584 19.7131 35.2344 20.2344 35.2344C20.7556 35.2344 21.1797 35.6584 21.1797 36.1797ZM27.7656 37.125C27.2444 37.125 26.8203 36.7009 26.8203 36.1797C26.8203 35.6584 27.2444 35.2344 27.7656 35.2344C28.2869 35.2344 28.7109 35.6584 28.7109 36.1797C28.7109 36.7009 28.2869 37.125 27.7656 37.125ZM30.5938 32.4141C30.5938 32.9353 30.1697 33.3594 29.6484 33.3594H18.3516C17.8303 33.3594 17.4062 32.9353 17.4062 32.4141V17.3516C17.4062 16.8303 17.8303 16.4062 18.3516 16.4062H29.6484C30.1697 16.4062 30.5938 16.8303 30.5938 17.3516V32.4141Z" fill="black" />
														<path d="M20.2344 18.2969C19.7166 18.2969 19.2969 18.7166 19.2969 19.2344V30.5312C19.2969 31.049 19.7166 31.4688 20.2344 31.4688C20.7521 31.4688 21.1719 31.049 21.1719 30.5312V19.2344C21.1719 18.7166 20.7521 18.2969 20.2344 18.2969Z" fill="black" />
														<path d="M24 18.2969C23.4822 18.2969 23.0625 18.7166 23.0625 19.2344V30.5312C23.0625 31.049 23.4822 31.4688 24 31.4688C24.5178 31.4688 24.9375 31.049 24.9375 30.5312V19.2344C24.9375 18.7166 24.5178 18.2969 24 18.2969Z" fill="black" />
														<path d="M27.7656 18.2969C27.2479 18.2969 26.8281 18.7166 26.8281 19.2344V30.5312C26.8281 31.049 27.2479 31.4688 27.7656 31.4688C28.2834 31.4688 28.7031 31.049 28.7031 30.5312V19.2344C28.7031 18.7166 28.2834 18.2969 27.7656 18.2969Z" fill="black" />
														<defs>
															<clipPath id="clip0_21_16353">
																<rect width={48} height="45.2958" fill="white" />
															</clipPath>
														</defs>
													</svg>
												</div>
												<div className="card-info">
													<h6 className="text-xl-bold neutral-1000">Transport</h6>
												</div>
											</div>
											<div className="card-why card-why-2 background-4 wow fadeInUp">
												<div className="card-image">
													<svg width={48} height={46} viewBox="0 0 48 46" xmlns="http://www.w3.org/2000/svg">
														<g clipPath="url(#clip0_21_15576)">
															<mask id="mask0_21_15576" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x={0} y={0} width={48} height={46}>
																<path d="M44.819 32.7853C42.7514 37.691 38.9274 41.3068 33.347 43.6326C27.7666 45.9585 22.5864 45.6066 17.8064 42.5772C13.0264 39.5478 8.40207 35.932 3.93332 31.7298C-0.535422 27.5277 -0.980074 22.9347 2.59937 17.9507C6.17881 12.9668 10.8032 8.35425 16.4725 4.11303C22.1418 -0.128193 28.8227 -1.01748 36.5151 1.44516C44.2076 3.90781 48.0316 8.52038 47.9871 15.2829C47.9427 22.0454 46.8866 27.8795 44.819 32.7853Z" fill="white" />
															</mask>
															<g mask="url(#mask0_21_15576)">
																<path d="M44.819 32.7853C42.7514 37.691 38.9274 41.3068 33.347 43.6326C27.7666 45.9585 22.5864 45.6066 17.8064 42.5772C13.0264 39.5478 8.40207 35.932 3.93332 31.7298C-0.535422 27.5277 -0.980074 22.9347 2.59937 17.9507C6.17881 12.9668 10.8032 8.35425 16.4725 4.11303C22.1418 -0.128193 28.8227 -1.01748 36.5151 1.44516C44.2076 3.90781 48.0316 8.52038 47.9871 15.2829C47.9427 22.0454 46.8866 27.8795 44.819 32.7853Z" fill="#F6F3FC" />
															</g>
														</g>
														<g clipPath="url(#clip1_21_15576)">
															<path d="M23.9999 7C17.3643 7 11.9658 12.3984 11.9658 19.034V26.966C11.9658 33.6015 17.3643 38.9999 23.9999 38.9999C30.6354 38.9999 36.0339 33.6015 36.0339 26.966V19.034C36.0339 12.3984 30.6354 7 23.9999 7ZM34.1581 26.966C34.1581 32.5672 29.6011 37.1242 23.9999 37.1242C18.3986 37.1242 13.8416 32.5672 13.8416 26.966V19.034C13.8416 13.4328 18.3986 8.87578 23.9999 8.87578C29.6011 8.87578 34.1581 13.4328 34.1581 19.034V26.966Z" fill="black" />
															<path d="M32.2822 19.034C32.2822 14.4671 28.5667 10.7516 23.9997 10.7516C19.4328 10.7516 15.7173 14.4671 15.7173 19.034V26.966C15.7173 31.5329 19.4328 35.2484 23.9997 35.2484C27.358 35.2484 30.2558 33.2392 31.5545 30.3598C31.5552 30.3582 31.5558 30.3567 31.5566 30.3551C32.0226 29.32 32.2823 28.1728 32.2823 26.966V24.712C32.2823 24.7067 32.2823 24.7015 32.2823 24.6962V19.034H32.2822ZM24.1923 25.9264C24.1973 24.9977 24.9545 24.2436 25.8843 24.2436C26.7104 24.2436 27.429 24.8577 27.5559 25.6719C27.6144 26.0474 27.8936 26.3504 28.2631 26.4394C28.6322 26.5283 29.0191 26.3856 29.242 26.0779C29.5172 25.6981 29.9405 25.4781 30.4064 25.4706V26.9661C30.4064 27.6968 30.2831 28.3992 30.0567 29.054H23.1368C22.5445 29.054 22.0626 28.5721 22.0626 27.9798C22.0626 27.3875 22.5445 26.9056 23.1368 26.9056H23.2552C23.5058 26.9056 23.746 26.8053 23.9222 26.6271C24.0983 26.4489 24.1959 26.2076 24.193 25.957C24.1929 25.9473 24.1926 25.9374 24.1923 25.9264ZM23.9997 12.6274C27.4052 12.6274 30.1982 15.2982 30.3949 18.6552H17.6046C17.8013 15.2982 20.5943 12.6274 23.9997 12.6274ZM23.9997 33.3727C20.4671 33.3727 17.5931 30.4987 17.5931 26.9661V20.531H30.4064V23.5949C29.865 23.5989 29.3385 23.735 28.8701 23.9827C28.6891 23.7063 28.4694 23.4541 28.2157 23.2349C27.5684 22.6758 26.7405 22.3679 25.8843 22.3679C24.1975 22.3679 22.7802 23.5446 22.4105 25.1203C21.134 25.4448 20.1868 26.6038 20.1868 27.9799C20.1868 29.6065 21.5102 30.9298 23.1368 30.9298H29.0295C27.8553 32.4166 26.0371 33.3727 23.9997 33.3727Z" fill="black" />
															<path d="M22.935 16.7794H25.0647C25.5826 16.7794 26.0026 16.3595 26.0026 15.8415C26.0026 15.3236 25.5826 14.9036 25.0647 14.9036H22.935C22.417 14.9036 21.9971 15.3236 21.9971 15.8415C21.9971 16.3595 22.417 16.7794 22.935 16.7794Z" fill="black" />
														</g>
														<defs>
															<clipPath id="clip0_21_15576">
																<rect width={48} height="45.2958" fill="white" />
															</clipPath>
															<clipPath id="clip1_21_15576">
																<rect width={32} height={32} fill="white" transform="translate(8 7)" />
															</clipPath>
														</defs>
													</svg>
												</div>
												<div className="card-info">
													<h6 className="text-xl-bold neutral-1000">Best time to visit</h6>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="section-box box-our-featured background-body">
						<div className="container">
							<div className="row align-items-end">
								<div className="col-lg-12 mb-30 text-center text-lg-start wow fadeInUp">
									<h2 className="neutral-1000">What to Do in Paris</h2>
									<p className="text-xl-medium neutral-500">Favorite destinations based on customer reviews</p>
								</div>
							</div>
						</div>
						<div className="container-slider box-swiper-padding">
							<div className="box-swiper mt-30">
								<div className="swiper-container swiper-group-animate swiper-group-journey pb-0">
									<Swiper {...swiperGroupAnimate}>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="label" href="#">Top Rated</Link><Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage5/tour.png" alt="StayChain" />
												</div>
												<div className="card-info background-card">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/tour-detail-2">Singapore Skylines: Urban Exploration</Link></div>
													<div className="card-program">
														<div className="card-duration-tour">
															<p className="icon-duration text-md-medium neutral-500">2 days 3 nights</p>
															<p className="icon-guest text-md-medium neutral-500">4-6 guest</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$48.25</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="label bestsale" href="#">Best Sale</Link><Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage5/tour2.png" alt="StayChain" />
												</div>
												<div className="card-info background-card">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/tour-detail-2">Icelandic Legends: Mystical Trails Journey</Link></div>
													<div className="card-program">
														<div className="card-duration-tour">
															<p className="icon-duration text-md-medium neutral-500">3 days 3 nights</p>
															<p className="icon-guest text-md-medium neutral-500">4-6 guest</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$17.32</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="label saleoff" href="#">25% Off</Link><Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage5/tour3.png" alt="StayChain" />
												</div>
												<div className="card-info background-card">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/tour-detail-2">Napa Valley Delights: Wine Country Retreat</Link></div>
													<div className="card-program">
														<div className="card-duration-tour">
															<p className="icon-duration text-md-medium neutral-500">7 days 6 nights</p>
															<p className="icon-guest text-md-medium neutral-500">4-6 guest</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$15.63</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="label" href="#">Top Rated</Link><Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage5/tour4.png" alt="StayChain" />
												</div>
												<div className="card-info background-card">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/tour-detail-2">Napa Valley Delights: Wine Country Retreat</Link></div>
													<div className="card-program">
														<div className="card-duration-tour">
															<p className="icon-duration text-md-medium neutral-500">2 days 3 nights</p>
															<p className="icon-guest text-md-medium neutral-500">4-6 guest</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$48.25</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="label bestsale" href="#">Best Sale</Link><Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage5/tour.png" alt="StayChain" />
												</div>
												<div className="card-info background-card">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/tour-detail-2">NYC: Food Tastings and Culture Tour</Link></div>
													<div className="card-program">
														<div className="card-duration-tour">
															<p className="icon-duration text-md-medium neutral-500">3 days 3 nights</p>
															<p className="icon-guest text-md-medium neutral-500">4-6 guest</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$17.32</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="label saleoff" href="#">25% Off</Link><Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage5/tour2.png" alt="StayChain" />
												</div>
												<div className="card-info background-card">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/tour-detail-2">Grand Canyon Horseshoe Bend  2 days</Link></div>
													<div className="card-program">
														<div className="card-duration-tour">
															<p className="icon-duration text-md-medium neutral-500">7 days 6 nights</p>
															<p className="icon-guest text-md-medium neutral-500">4-6 guest</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$15.63</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="#">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
									</Swiper>
								</div>
							</div>
						</div>
					</section>
					<section className="section-box box-top-rated background-1">
						<div className="container">
							<div className="row align-items-end">
								<div className="col-md-9">
									<h2 className="neutral-1000">Top hotels in Paris</h2>
									<p className="text-xl-medium neutral-500">Quality as judged by customers. Book at the ideal price!</p>
								</div>
								<div className="col-md-3 position-relative mb-30">
									<div className="d-flex justify-content-center justify-content-md-end"><Link className="btn btn-black-lg" href="#">View More
										<svg width={16} height={16} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
											<path d="M8 15L15 8L8 1M15 8L1 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
										</svg></Link></div>
								</div>
							</div>
						</div>
						<div className="container-slider box-swiper-padding">
							<div className="box-swiper mt-30">
								<div className="swiper-container swiper-group-animate swiper-group-journey">
									<Swiper {...swiperGroupAnimate}>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage1/journey2.png" alt="StayChain" /></div>
												<div className="card-info">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail">California Sunset/Twilight Boat Cruise </Link></div>
													<div className="card-program">
														<div className="card-location">
															<p className="text-location text-md-medium neutral-500">Manchester, England</p>
															<p className="text-star"> <img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /></p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$48.25</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/hotel-detail">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage1/journey3.png" alt="StayChain" /></div>
												<div className="card-info">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail">NYC: Food Tastings and Culture Tour</Link></div>
													<div className="card-program">
														<div className="card-location">
															<p className="text-location text-md-medium neutral-500">Manchester, England</p>
															<p className="text-star"> <img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /></p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$17.32</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/hotel-detail">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage1/journey4.png" alt="StayChain" /></div>
												<div className="card-info">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail">Grand Canyon Horseshoe Bend  2 days</Link></div>
													<div className="card-program">
														<div className="card-location">
															<p className="text-location text-md-medium neutral-500">Manchester, England</p>
															<p className="text-star"> <img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /></p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$15.63</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/hotel-detail">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage1/journey3.png" alt="StayChain" /></div>
												<div className="card-info">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail">NYC: Food Tastings and Culture Tour</Link></div>
													<div className="card-program">
														<div className="card-location">
															<p className="text-location text-md-medium neutral-500">Manchester, England</p>
															<p className="text-star"> <img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /></p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$17.32</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/hotel-detail">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage1/journey2.png" alt="StayChain" /></div>
												<div className="card-info">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail">California Sunset/Twilight Boat Cruise </Link></div>
													<div className="card-program">
														<div className="card-location">
															<p className="text-location text-md-medium neutral-500">Manchester, England</p>
															<p className="text-star"> <img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /></p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$48.25</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/hotel-detail">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage1/journey3.png" alt="StayChain" /></div>
												<div className="card-info">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail">NYC: Food Tastings and Culture Tour</Link></div>
													<div className="card-program">
														<div className="card-location">
															<p className="text-location text-md-medium neutral-500">Manchester, England</p>
															<p className="text-star"> <img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /></p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$17.32</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/hotel-detail">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage1/journey4.png" alt="StayChain" /></div>
												<div className="card-info">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail">Grand Canyon Horseshoe Bend  2 days</Link></div>
													<div className="card-program">
														<div className="card-location">
															<p className="text-location text-md-medium neutral-500">Manchester, England</p>
															<p className="text-star"> <img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /></p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$15.63</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/hotel-detail">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage1/journey3.png" alt="StayChain" /></div>
												<div className="card-info">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/hotel-detail">NYC: Food Tastings and Culture Tour</Link></div>
													<div className="card-program">
														<div className="card-location">
															<p className="text-location text-md-medium neutral-500">Manchester, England</p>
															<p className="text-star"> <img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="light-mode" src="/assets/imgs/template/icons/star-black.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /><img className="dark-mode" src="/assets/imgs/template/icons/star-w.svg" alt="StayChain" /></p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$17.32</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/hotel-detail">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
									</Swiper>
								</div>
							</div>
						</div>
					</section>
					<section className="section-box box-our-featured background-body pt-60">
						<div className="container">
							<div className="row align-items-end">
								<div className="col-lg-6 mb-30 text-center text-lg-start wow fadeInUp">
									<h2 className="neutral-1000">Top activities in Paris</h2>
									<p className="text-xl-medium neutral-500">Explore the world by multi adventure activities</p>
								</div>
								<div className="col-lg-6 mb-30 wow fadeInUp">
								<CategoryFilter />
								</div>
							</div>
						</div>
						<div className="container-slider box-swiper-padding">
							<div className="box-swiper mt-30">
								<div className="swiper-container swiper-group-animate swiper-group-journey pb-0">
									<Swiper {...swiperGroupAnimate}>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="label" href="#">Top Rated</Link><Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage5/tour.png" alt="StayChain" />
												</div>
												<div className="card-info background-card">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/activities-detail-2">Singapore Skylines: Urban Exploration</Link></div>
													<div className="card-program">
														<div className="card-duration-tour">
															<p className="icon-duration text-md-medium neutral-500">2 days 3 nights</p>
															<p className="icon-guest text-md-medium neutral-500">4-6 guest</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$48.25</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/activities-detail-2">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="label bestsale" href="#">Best Sale</Link><Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage5/tour2.png" alt="StayChain" />
												</div>
												<div className="card-info background-card">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/activities-detail-2">Icelandic Legends: Mystical Trails Journey</Link></div>
													<div className="card-program">
														<div className="card-duration-tour">
															<p className="icon-duration text-md-medium neutral-500">3 days 3 nights</p>
															<p className="icon-guest text-md-medium neutral-500">4-6 guest</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$17.32</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/activities-detail-2">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="label saleoff" href="#">25% Off</Link><Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage5/tour3.png" alt="StayChain" />
												</div>
												<div className="card-info background-card">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/activities-detail-2">Napa Valley Delights: Wine Country Retreat</Link></div>
													<div className="card-program">
														<div className="card-duration-tour">
															<p className="icon-duration text-md-medium neutral-500">7 days 6 nights</p>
															<p className="icon-guest text-md-medium neutral-500">4-6 guest</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$15.63</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/activities-detail-2">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="label" href="#">Top Rated</Link><Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage5/tour4.png" alt="StayChain" />
												</div>
												<div className="card-info background-card">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/activities-detail-2">Napa Valley Delights: Wine Country Retreat</Link></div>
													<div className="card-program">
														<div className="card-duration-tour">
															<p className="icon-duration text-md-medium neutral-500">2 days 3 nights</p>
															<p className="icon-guest text-md-medium neutral-500">4-6 guest</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$48.25</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/activities-detail-2">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="label bestsale" href="#">Best Sale</Link><Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage5/tour.png" alt="StayChain" />
												</div>
												<div className="card-info background-card">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/activities-detail-2">NYC: Food Tastings and Culture Tour</Link></div>
													<div className="card-program">
														<div className="card-duration-tour">
															<p className="icon-duration text-md-medium neutral-500">3 days 3 nights</p>
															<p className="icon-guest text-md-medium neutral-500">4-6 guest</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$17.32</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/activities-detail-2">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="label saleoff" href="#">25% Off</Link><Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/homepage5/tour2.png" alt="StayChain" />
												</div>
												<div className="card-info background-card">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/activities-detail-2">Grand Canyon Horseshoe Bend  2 days</Link></div>
													<div className="card-program">
														<div className="card-duration-tour">
															<p className="icon-duration text-md-medium neutral-500">7 days 6 nights</p>
															<p className="icon-guest text-md-medium neutral-500">4-6 guest</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$15.63</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/activities-detail-2">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
									</Swiper>
								</div>
							</div>
						</div>
					</section>
					<section className="section-box box-recent-lauched-car box-retal-car-destination-4 background-body">
						<div className="container">
							<div className="row align-items-end">
								<div className="col-md-9">
									<h2 className="neutral-1000">Cars Rental in Paris</h2>
									<p className="text-xl-medium neutral-500">The world's leading car brands</p>
								</div>
								<div className="col-md-3 position-relative mb-30">
									<div className="box-button-slider box-button-slider-team justify-content-end">
										<div className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-animate">
											<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" >
												<path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</div>
										<div className="swiper-button-next swiper-button-next-style-1 swiper-button-next-animate">
											<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" >
												<path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="container-slider box-swiper-padding">
							<div className="box-swiper mt-30">
								<div className="swiper-container swiper-group-animate swiper-group-journey">
									<Swiper {...swiperGroupAnimate}>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/destination/car.png" alt="StayChain" /></div>
												<div className="card-info">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/rental-detail">Audi A3 1.6 TDI S line</Link></div>
													<div className="card-program">
														<div className="card-location">
															<p className="text-location text-md-medium neutral-500">Manchester, England</p>
														</div>
														<div className="card-facitlities">
															<p className="card-miles text-md-medium">25,100 miles</p>
															<p className="card-gear text-md-medium">Automatic</p>
															<p className="card-fuel text-md-medium">Diesel</p>
															<p className="card-seat text-md-medium">7 seats</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$498.25</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/rental-detail">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/destination/car2.png" alt="StayChain" /></div>
												<div className="card-info">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/rental-detail">Audi A3 1.6 TDI S line</Link></div>
													<div className="card-program">
														<div className="card-location">
															<p className="text-location text-md-medium neutral-500">Manchester, England</p>
														</div>
														<div className="card-facitlities">
															<p className="card-miles text-md-medium">25,100 miles</p>
															<p className="card-gear text-md-medium">Automatic</p>
															<p className="card-fuel text-md-medium">Diesel</p>
															<p className="card-seat text-md-medium">7 seats</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$498.25</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/rental-detail">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/destination/car3.png" alt="StayChain" /></div>
												<div className="card-info">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/rental-detail">Audi A3 1.6 TDI S line</Link></div>
													<div className="card-program">
														<div className="card-location">
															<p className="text-location text-md-medium neutral-500">Manchester, England</p>
														</div>
														<div className="card-facitlities">
															<p className="card-miles text-md-medium">25,100 miles</p>
															<p className="card-gear text-md-medium">Automatic</p>
															<p className="card-fuel text-md-medium">Diesel</p>
															<p className="card-seat text-md-medium">7 seats</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$498.25</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/rental-detail">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
										<SwiperSlide>
											<div className="card-journey-small background-card">
												<div className="card-image"> <Link className="wish" href="#">
													<svg width={20} height={18} viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">
														<path d="M17.071 10.1422L11.4141 15.7991C10.6331 16.5801 9.36672 16.5801 8.58568 15.7991L2.92882 10.1422C0.9762 8.1896 0.9762 5.02378 2.92882 3.07116C4.88144 1.11853 8.04727 1.11853 9.99989 3.07116C11.9525 1.11853 15.1183 1.11853 17.071 3.07116C19.0236 5.02378 19.0236 8.1896 17.071 10.1422Z" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
													</svg></Link><img src="/assets/imgs/page/destination/car4.png" alt="StayChain" /></div>
												<div className="card-info">
													<div className="card-rating">
														<div className="card-left"> </div>
														<div className="card-right"> <span className="rating">4.96 <span className="text-sm-medium neutral-500">(672 reviews)</span></span></div>
													</div>
													<div className="card-title"> <Link className="heading-6 neutral-1000" href="/rental-detail">Audi A3 1.6 TDI S line</Link></div>
													<div className="card-program">
														<div className="card-location">
															<p className="text-location text-md-medium neutral-500">New South Wales, Australia</p>
														</div>
														<div className="card-facitlities">
															<p className="card-miles text-md-medium">25,100 miles</p>
															<p className="card-gear text-md-medium">Automatic</p>
															<p className="card-fuel text-md-medium">Diesel</p>
															<p className="card-seat text-md-medium">7 seats</p>
														</div>
														<div className="endtime">
															<div className="card-price">
																<h6 className="heading-6 neutral-1000">$498.25</h6>
																<p className="text-md-medium neutral-500">/ person</p>
															</div>
															<div className="card-button"> <Link className="btn btn-gray" href="/rental-detail">Book Now</Link></div>
														</div>
													</div>
												</div>
											</div>
										</SwiperSlide>
									</Swiper>
								</div>
							</div>
						</div>
					</section>
					<section className="section-box box-media background-body">
						<div className="container-media wow fadeInUp"> <img src="/assets/imgs/page/homepage5/media.png" alt="StayChain" /><img src="/assets/imgs/page/homepage5/media2.png" alt="StayChain" /><img src="/assets/imgs/page/homepage5/media3.png" alt="StayChain" /><img src="/assets/imgs/page/homepage5/media4.png" alt="StayChain" /><img src="/assets/imgs/page/homepage5/media5.png" alt="StayChain" /><img src="/assets/imgs/page/homepage5/media6.png" alt="StayChain" /><img src="/assets/imgs/page/homepage5/media7.png" alt="StayChain" /></div>
					</section>
				</main>

			{/* </Layout> */}
		</>
	)
}