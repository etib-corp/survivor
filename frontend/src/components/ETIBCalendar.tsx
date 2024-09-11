import { Button } from "flowbite-react";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

const ETIBCalendar: React.FC<({ events: any })> = ({ events }) => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	selectedDate.setDate(1);
	return (
		<div className="lg:flex lg:h-full lg:flex-col p-5 m-5 border border-gray-300 rounded-md">
			<header className="flex items-center justify-between border-b border-gray-200 py-4 lg:flex-none">
				<div className="flex items-center space-x-5">
					<h1 className="text-base font-bold leading-6 text-gray-900">
						<time className="text-xl sticky" dateTime="">{monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</time>
					</h1>
					<div className="flex absolute translate-x-36">
						<button type="button" className="flex h-9 w-12 items-center justify-center pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50" onClick={ () => {
                            selectedDate.setDate(0);
                            selectedDate.setDate(1);
							setSelectedDate(new Date(selectedDate));
                            console.log(selectedDate);
                        }}>
							<IoIosArrowBack size={100} />

						</button>
						<button type="button" className="flex h-9 w-12 items-center justify-center pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50" onClick={ () => {
                            selectedDate.setMonth(selectedDate.getMonth() + 1);
							setSelectedDate(new Date(selectedDate));
                            console.log(selectedDate);
                        }}>
							<IoIosArrowForward size={100} />
						</button>
					</div>
				</div>
				<div className="flex items-center">
					<div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
						<button type="button" className="hidden border rounded-lg border-gray-300 px-3.5 text-base h-10 font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block">Today</button>
					</div>
					<div className="hidden md:ml-4 md:flex md:items-center">
						<div className="flex">
							<button type="button" className="flex items-center gap-x-1.5 rounded-s-md h-10 bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button">
								Month
							</button>
							<button type="button" className="flex items-center gap-x-1.5 h-10 bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button">
								Week
							</button>
							<button type="button" className="flex items-center gap-x-1.5 h-10 bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button">
								Day
							</button>
							<button type="button" className="flex items-center gap-x-1.5 rounded-e-md h-10 bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button">
								List
							</button>
						</div>
					</div>
				</div>
			</header >
			<div className="shadow ring-1 ring-gray-300 lg:flex lg:flex-auto lg:flex-col">
				<div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xl font-semibold leading-6 text-gray-700 lg:flex-none">
					<div className="flex justify-center bg-white py-2">
						<span>M</span>
						<span className="sr-only sm:not-sr-only">on</span>
					</div>
					<div className="flex justify-center bg-white py-2">
						<span>T</span>
						<span className="sr-only sm:not-sr-only">ue</span>
					</div>
					<div className="flex justify-center bg-white py-2">
						<span>W</span>
						<span className="sr-only sm:not-sr-only">ed</span>
					</div>
					<div className="flex justify-center bg-white py-2">
						<span>T</span>
						<span className="sr-only sm:not-sr-only">hu</span>
					</div>
					<div className="flex justify-center bg-white py-2">
						<span>F</span>
						<span className="sr-only sm:not-sr-only">ri</span>
					</div>
					<div className="flex justify-center bg-white py-2">
						<span>S</span>
						<span className="sr-only sm:not-sr-only">at</span>
					</div>
					<div className="flex justify-center bg-white py-2">
						<span>S</span>
						<span className="sr-only sm:not-sr-only">un</span>
					</div>
				</div>
				<div className="flex bg-gray-200 text-xl leading-6 text-gray-700 lg:flex-auto">
					<div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
						{/* <!--
          Always include: "relative py-2 px-3"
          Is current month, include: "bg-white"
          Is not current month, include: "bg-gray-50 text-gray-500"
        --> */}
						<div className="relative bg-gray-50 px-3 py-2 text-gray-500">
							{/* <!--
            Is today, include: "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
          --> */}
							<time className="float-right" dateTime="2021-12-27">27</time>
						</div>
						<div className="relative bg-gray-50 px-3 py-2 text-gray-500">
							<time className="float-right" dateTime="2021-12-28">28</time>
						</div>
						<div className="relative bg-gray-50 px-3 py-2 text-gray-500">
							<time className="float-right" dateTime="2021-12-29">29</time>
						</div>
						<div className="relative bg-gray-50 px-3 py-2 text-gray-500">
							<time className="float-right" dateTime="2021-12-30">30</time>
						</div>
						<div className="relative bg-gray-50 px-3 py-2 text-gray-500">
							<time className="float-right" dateTime="2021-12-31">31</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-01">1</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-01">2</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-03">3</time>
							<ol className="mt-6 space-y-1">
								<li>
									<a href="#" className="group flex bg-purple-600 border border-purple-600 rounded-md">
                                        <time dateTime="2022-01-03T10:00" className="ml-3 hidden flex-none text-white group-hover:text-indigo-600 xl:block">10A</time>
										<p className="flex-auto truncate font-bold text-white group-hover:text-indigo-600 pl-2">Design review</p>
									</a>
								</li>
								<li>
									<a href="#" className="group flex bg-red-600 border border-red-600 rounded-md">
                                        <time dateTime="2022-01-03T14:00" className="ml-3 hidden flex-none text-white group-hover:text-indigo-600 xl:block">2P</time>
										<p className="flex-auto truncate font-bold text-white group-hover:text-indigo-600 pl-2">Sales meeting</p>
									</a>
								</li>
							</ol>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-04">4</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-05">5</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-06">6</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-07">7</time>
							<ol className="mt-6 space-y-1">
								<li>
									<a href="#" className="group flex">
                                        <time dateTime="2022-01-08T18:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">6P</time>
										<p className="flex-auto truncate font-bold text-gray-900 group-hover:text-indigo-600 pl-2">Date night</p>
									</a>
								</li>
							</ol>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-08">8</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-09">9</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-10">10</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-11">11</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time dateTime="2022-01-12" className="flex h-6 w-6 float-right items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">12</time>
							<ol className="mt-6 space-y-1">
								<li>
									<a href="#" className="group flex">
                                        <time dateTime="2022-01-25T14:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">2P</time>
										<p className="flex-auto truncate font-bold text-gray-900 group-hover:text-indigo-600 pl-2">Sam's birthday party</p>
									</a>
								</li>
							</ol>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-13">13</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-14">14</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-15">15</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-16">16</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-17">17</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-18">18</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-19">19</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-20">20</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-21">21</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-22">22</time>
							<ol className="mt-6 space-y-1">
								<li>
									<a href="#" className="group flex">
                                        <time dateTime="2022-01-22T15:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">3P</time>
										<p className="flex-auto truncate font-bold text-gray-900 group-hover:text-indigo-600 pl-2">Maple syrup museum</p>
									</a>
								</li>
								<li>
									<a href="#" className="group flex">
                                        <time dateTime="2022-01-22T19:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">7P</time>
										<p className="flex-auto truncate font-bold text-gray-900 group-hover:text-indigo-600 pl-2">Hockey game</p>
									</a>
								</li>
							</ol>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-23">23</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-24">24</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-25">25</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-26">26</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-27">27</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-28">28</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-29">29</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-30">30</time>
						</div>
						<div className="relative bg-white px-3 py-2">
							<time className="float-right" dateTime="2022-01-31">31</time>
						</div>
						<div className="relative bg-gray-50 px-3 py-2 text-gray-500">
							<time className="float-right" dateTime="2022-02-01">1</time>
						</div>
						<div className="relative bg-gray-50 px-3 py-2 text-gray-500">
							<time className="float-right" dateTime="2022-02-02">2</time>
						</div>
						<div className="relative bg-gray-50 px-3 py-2 text-gray-500">
							<time className="float-right" dateTime="2022-02-03">3</time>
						</div>
						<div className="relative bg-gray-50 px-3 py-2 text-gray-500">
							<time className="float-right" dateTime="2022-02-04">4</time>
							<ol className="mt-6 space-y-1">
								<li>
									<a href="#" className="group flex">
                                        <time dateTime="2022-02-04T21:00" className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">9P</time>
										<p className="flex-auto truncate font-bold text-gray-900 group-hover:text-indigo-600 pl-2">Cinema with friends</p>
									</a>
								</li>
							</ol>
						</div>
						<div className="relative bg-gray-50 px-3 py-2 text-gray-500">
							<time className="float-right" dateTime="2022-02-05">5</time>
						</div>
						<div className="relative bg-gray-50 px-3 py-2 text-gray-500">
							<time className="float-right" dateTime="2022-02-06">6</time>
						</div>
					</div>
					<div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
						{/* <!--
          Always include: "flex h-14 flex-col py-2 px-3 hover:bg-gray-100 focus:z-10"
          Is current month, include: "bg-white"
          Is not current month, include: "bg-gray-50"
          Is selected or is today, include: "font-semibold"
          Is selected, include: "text-white"
          Is not selected and is today, include: "text-indigo-600"
          Is not selected and is current month, and is not today, include: "text-gray-900"
          Is not selected, is not current month, and is not today: "text-gray-500"
        --> */}
						<button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
							{/* <!--
            Always include: "ml-auto"
            Is selected, include: "flex h-6 w-6 items-center justify-center rounded-full"
            Is selected and is today, include: "bg-indigo-600"
            Is selected and is not today, include: "bg-gray-900"
          --> */}
							<time dateTime="2021-12-27" className="ml-auto">27</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
							<time dateTime="2021-12-28" className="ml-auto">28</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
							<time dateTime="2021-12-29" className="ml-auto">29</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
							<time dateTime="2021-12-30" className="ml-auto">30</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
							<time dateTime="2021-12-31" className="ml-auto">31</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-01" className="ml-auto">1</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-02" className="ml-auto">2</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-03" className="ml-auto">3</time>
							<span className="sr-only">2 events</span>
							<span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
								<span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
								<span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
							</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-04" className="ml-auto">4</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-05" className="ml-auto">5</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-06" className="ml-auto">6</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-07" className="ml-auto">7</time>
							<span className="sr-only">1 event</span>
							<span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
								<span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
							</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-08" className="ml-auto">8</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-09" className="ml-auto">9</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-10" className="ml-auto">10</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-11" className="ml-auto">11</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-indigo-600 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-12" className="ml-auto">12</time>
							<span className="sr-only">1 event</span>
							<span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
								<span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
							</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-13" className="ml-auto">13</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-14" className="ml-auto">14</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-15" className="ml-auto">15</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-16" className="ml-auto">16</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-17" className="ml-auto">17</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-18" className="ml-auto">18</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-19" className="ml-auto">19</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-20" className="ml-auto">20</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-21" className="ml-auto">21</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 font-semibold text-white hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-22" className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-gray-900">22</time>
							<span className="sr-only">2 events</span>
							<span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
								<span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
								<span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
							</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-23" className="ml-auto">23</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-24" className="ml-auto">24</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-25" className="ml-auto">25</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-26" className="ml-auto">26</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-27" className="ml-auto">27</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-28" className="ml-auto">28</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-29" className="ml-auto">29</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-30" className="ml-auto">30</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-white px-3 py-2 text-gray-900 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-01-31" className="ml-auto">31</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-02-01" className="ml-auto">1</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-02-02" className="ml-auto">2</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-02-03" className="ml-auto">3</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-02-04" className="ml-auto">4</time>
							<span className="sr-only">1 event</span>
							<span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
								<span className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
							</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-02-05" className="ml-auto">5</time>
							<span className="sr-only">0 events</span>
						</button>
						<button type="button" className="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10">
							<time dateTime="2022-02-06" className="ml-auto">6</time>
							<span className="sr-only">0 events</span>
						</button>
					</div>
				</div>
			</div>
		</div >
	)
};

export default ETIBCalendar;