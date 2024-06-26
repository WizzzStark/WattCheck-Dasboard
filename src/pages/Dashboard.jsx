import { useState, useEffect } from 'react';
import { getStorage, ref, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Papa from 'papaparse';
import moment from 'moment';

import BarChartComponent from '../components/charts/BarChart';
import PieChartComponent from '../components/charts/PieChart';
import AreaChartComponent from '../components/charts/AreaChart';
import DateAreaChart from '../components/charts/DateAreaChart';
import DownloadCSVButton from '../components/DownloadCSVButton';

import SideBar, { SideBarElement } from '../components/SideBar';
import { File, LayoutDashboard, Upload } from 'lucide-react';
import FeaturedPrices from '../components/FeaturedPrices';
import PersonalConsumption from '../components/PersonalConsumption';
import { Toaster } from 'sonner';
import { DragAndDrop } from '../components/DragAndDrop';
import { FiDownload } from 'react-icons/fi';

export default function Dashboard() {
    const [files, setFiles] = useState([]);
    const [signal, setSignal] = useState(false);
    const [activeSidebarOption, setactiveSidebarOption] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const [csvText, setCsvText] = useState('');
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    const [currentPrice, setCurrentPrice] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    const [percentageConsumption, setPercentageConsumption] = useState(0);
    const [kilogramsCO2, setKilogramsCO2] = useState(0);


    useEffect(() => {

        const fetchData = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            const storage = getStorage();

            if (user && files.length > 0) {
                const userEmail = user.email.replace('.', ',');
                const filePath = `uploads/${userEmail}/1.csv`;
                const storageRef = ref(storage, filePath);

                try {
                    const url = await getDownloadURL(storageRef);
                    const response = await fetch(url);
                    const text = await response.text();
                    parseCsv(text);
                } catch (error) {
                    console.error('Error fetching file:', error);
                }
            }
        };

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userEmail = user.email.replace('.', ',');
                const userFilesRef = ref(getStorage(), `uploads/${userEmail}/`);

                listAll(userFilesRef).then((result) => {
                    const fileNames = result.items.map(item => item.name);
                    setFiles(fileNames);
                    fetchData();

                }).catch((error) => {
                    console.error('Error fetching files:', error);
                });
            }
        });
    }, [signal, files.length]);

    useEffect(() => {
        const urls = {
            current: 'https://miguel-server-main.vercel.app/light/lightprice',
            min: 'https://miguel-server-main.vercel.app/light/lightpricemin',
            max: 'https://miguel-server-main.vercel.app/light/lightpricemax'
        };

        const fetchData = async (url) => {
            try {
                const response = await fetch(url, { mode: 'cors' });
                const data = await response.json();
                return data.price;
            } catch (error) {
                console.error('Error fetching electricity prices:', error);
                return null;
            }
        };

        fetchData(urls.current).then(price => setCurrentPrice(price));
        fetchData(urls.min).then(price => setMinPrice(price));
        fetchData(urls.max).then(price => setMaxPrice(price));
    }, []);

    useEffect(() => {
        const testdata = generateData(2023, 1, 1, 365);
        setData2(testdata);
    }, []);

    useEffect(() => {
        const normalDailyConsumption = 10; // kWh

        if (data.length > 0) {
            const totalConsumption = data.reduce((acc, curr) => acc + parseFloat(curr.Consumo_KWh), 0);

            const totalCO2 = totalConsumption * 0.233;

            const percentageConsumption = (totalConsumption / normalDailyConsumption) * 100;

            setPercentageConsumption(percentageConsumption);
            setKilogramsCO2(totalCO2);
        }
    }, [data])

    const processData = () => {
        return data.reduce((acc, curr) => {
            const hour = curr.Hora;
            const index = acc.findIndex(item => item.name === `Hora ${hour}`);
            if (index > -1) {
                acc[index].value += parseFloat(curr.Consumo_KWh);
            } else {
                acc.push({ name: `Hora ${hour}`, value: parseFloat(curr.Consumo_KWh) });
            }
            return acc;
        }, []);
    };

    const handleSetActiveSideBar = index => {
        setactiveSidebarOption(index);
    };

    const parseCsv = (csvData) => {
        Papa.parse(csvData, {
            header: true,
            complete: (results) => {
                const transformedData = results.data.map(entry => ({
                    ...entry,
                    Timestamp: parseInt(entry.Timestamp, 10),
                    Consumo_KWh: parseFloat(entry.Consumo_KWh),
                    Precio_KWh_euro: parseFloat(entry.Precio_KWh_euro)
                }));
                setData(transformedData);
                setCsvText(csvData);
            },
            skipEmptyLines: true,
            transform: (value, column) => {
                if (column === 'Consumo_KWh' || column === 'Precio_KWh_euro') {
                    return parseFloat(value);
                }
                if (column === 'Timestamp') {
                    return parseInt(value, 10);
                }
                return value;
            }
        });
    };

    const changeActiveCSV = async (csvname) => {
        const auth = getAuth();
        const user = auth.currentUser;
        const storage = getStorage();

        if (user) {
            const userEmail = user.email.replace('.', ',');
            const filePath = `uploads/${userEmail}/${csvname}`;
            const storageRef = ref(storage, filePath);

            try {
                const url = await getDownloadURL(storageRef);
                const response = await fetch(url);
                const text = await response.text();
                parseCsv(text);
            } catch (error) {
                console.error('Error fetching file:', error);
            }
        } else {
            console.error('No user logged in');
        }
    }

    const co2Emissions = data.map(d => ({
        ...d,
        CO2: d.Consumo_KWh ? parseFloat(d.Consumo_KWh) * 0.233 : 0
    }));

    const processLightPriceData = () => {
        return data.reduce((acc, curr) => {
            const hour = curr.Hora;
            const timestamp = curr.Timestamp;
            const consumption = parseFloat(curr.Consumo_KWh);
            const pricePerKWh = parseFloat(curr.Precio_KWh_euro);
            const totalCost = consumption * pricePerKWh;

            const index = acc.findIndex(item => item.hour === hour && item.timestamp === timestamp);
            if (index > -1) {
                acc[index].value += totalCost;
            } else {
                acc.push({ hour: `Hora ${hour}`, Timestamp: timestamp, value: totalCost });
            }
            return acc;
        }, []);
    };



    const PieChartData = processData();
    const lightPriceData = processLightPriceData();
    const COLORS = [
        '#2E8B57', // SeaGreen
        '#3CB371', // MediumSeaGreen
        '#20B2AA', // LightSeaGreen
        '#008080', // Teal
        '#48D1CC'  // MediumTurquoise
    ];

    function generateData(startYear, startMonth, startDay, numDays) {
        const data = [];
        let currentDate = moment([startYear, startMonth - 1, startDay]);

        for (let i = 0; i < numDays; i++) {
            data.push({
                timestamp: currentDate.valueOf(),
                value: Math.floor(Math.random() * (320 - 100 + 1) + 100)
            });
            currentDate.add(1, 'days');
        }

        return data;
    }

    const deleteCSV = async (fileName) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const userEmail = user.email.replace('.', ',');
            const filePath = `uploads/${userEmail}/${fileName}`;
            const fileRef = ref(getStorage(), filePath);

            try {
                await deleteObject(fileRef);
                setFiles(prevFiles => prevFiles.filter(file => file !== fileName));
            } catch (error) {
                console.error('Error deleting file:', error);
            }
        }
    };

    return (
        <div className='bg-black text-white flex'>
            <Toaster position="bottom-right" richColors />

            <div className='sticky top-0 h-[100vh] z-[5]'>
                <SideBar activeSideBar={activeSidebarOption} files={files} setSignal={setSignal} signal={signal}>
                    <SideBarElement icon={<LayoutDashboard size={20} />} text='Dashboard' active={activeSidebarOption === 0} onClick={() => handleSetActiveSideBar(0)} />
                    <SideBarElement icon={<Upload size={20} />} text='Upload File' active={activeSidebarOption === 1} onClick={() => handleSetActiveSideBar(1)} />
                    <hr className='my-3' />
                    {activeSidebarOption !== 1 && (
                        files.map((file, index) => (
                            <SideBarElement
                                key={index}
                                icon={<File size={20} />}
                                text={`File: ${file}`}
                                onClick={() => changeActiveCSV(file)}
                                canDelete
                                onDeleteClick={() => deleteCSV(file)}
                            />
                        ))
                    )}

                </SideBar>
            </div>


            {files.length > 0 ? (
                <section className='bg-black text-white flex-1 overflow-hidden relative poppins backdrop-blur-md'>
                    <div className='relative z-[5]'>

                        <FeaturedPrices currentPrice={currentPrice} minPrice={minPrice} maxPrice={maxPrice} />

                        <div className='flex flex-col gap-10 mx-10 relative'>
                            <DateAreaChart data={data2} text="Historic price MW/h in Spain" />
                            <div className='flex flex-col md:flex-row gap-10 relative z-10'>
                                <AreaChartComponent data={data} colors={COLORS} text="Electricty Consumption" yAxisValue="Consumo_KWh" />
                                <AreaChartComponent data={data} colors={COLORS} text="Electricty Price" yAxisValue="Precio_KWh_euro" />
                                <AreaChartComponent data={lightPriceData} colors={COLORS} text="Your Electricty Price" yAxisValue="value" />

                            </div>

                        </div>

                        <div className='flex flex-col md:flex-row gap-10 mx-10 relative mt-10'>
                            <BarChartComponent data={co2Emissions} text="CO2 Consumption" yAxisValue="CO2" />
                            <PieChartComponent data={PieChartData} activeIndex={activeIndex} onPieEnter={(e, index) => setActiveIndex(index)} colors={COLORS} />
                        </div>

                        <div className='flex flex-col md:flex-row gap-10 mx-10 relative mt-10 '>
                            <PersonalConsumption percentage={percentageConsumption} co2Consumed={kilogramsCO2} />
                        </div>

                        <DownloadCSVButton csvData={csvText} />

                    </div>
                    <div className='absolute z-[0] w-[30%] h-[20%] top-10 left-[460px] green__gradient opacity-70' />
                    <div className='absolute z-[0] w-[20%] h-[25%] top-[100px] right-[10px] green__gradient opacity-50' />
                    <div className='absolute z-[0] w-[10%] h-[20%] top-[600px] left-[10px] green__gradient opacity-80' />
                    <div className='absolute z-[0] w-[20%] h-[20%] top-[390px] left-[700px] green__gradient opacity-45' />
                    <div className='absolute z-[0] w-[20%] h-[20%] top-[700px] right-[70px] green__gradient opacity-45' />
                    <div className='absolute z-[0] w-[25%] h-[25%] top-[900px] right-[200px] green__gradient opacity-40' />
                    <div className='absolute z-[0] w-[30%] h-[35%] top-[1100px] left-[200px] green__gradient opacity-70' />

                </section>
            ) : (
                <>
                    <div className='relative flex w-full flex-col h-[100vh] overflow-hidden'>
                        <h1 className='text-[60px] poppins text-center mt-10 relative z-[5]'>Upload your first file</h1>
                        <h2 className='text-[20px] poppins text-center relative z-[5] mb-3'>Start analyzing your electricity data</h2>
                        <a className='relative bg-white w-[95%] mx-auto h-20 text-black hover:bg-gray-200 z-[5] flex justify-center items-center' href="/consumptions.csv">
                            <div className='flex items-center gap-5'>
                                <FiDownload size={20} className='text-black' />
                                <p className='text-[16px] font-semibold'>
                                    Download sample file
                                </p>
                            </div>
                        </a>
                        <DragAndDrop signal={signal} setSignal={setSignal} styles="relative h-[75%] z-[5] w-[95%] mx-auto mt-10" />
                        <div className='absolute z-[0] w-[20%] h-[40%] top-10 left-[460px] green__gradient opacity-30' />
                        <div className='absolute z-[0] w-[20%] h-[40%] top-80 left-[700px] green__gradient opacity-30' />
                        <div className='absolute z-[0] w-[20%] h-[45%] top-[100px] right-[10px] green__gradient opacity-30' />
                        <div className='absolute z-[0] w-[30%] h-[20%] top-[600px] left-[10px] green__gradient opacity-40' />
                        <div className='absolute z-[0] w-[20%] h-[50%] top-[700px] right-[70px] green__gradient opacity-35' />
                    </div>
                </>
            )}

        </div>
    );
}