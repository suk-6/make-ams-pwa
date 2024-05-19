import QRCode from "react-qr-code";
import { checkQR } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DoorStatus } from "../misc/doorStatus";

interface lockStatusBoxProps {
	status: DoorStatus | undefined;
}

export const HomeFeature = ({ status }: lockStatusBoxProps) => {
	const navigate = useNavigate();

	useEffect(() => {
		try {
			checkQR().then((res) => {
				if (!res) {
					if (
						confirm("유효하지 않은 QR입니다. 다시 로그인해주세요.")
					) {
						localStorage.removeItem("code");
						navigate("/login");
					}
				}
			});
		} catch (e) {
			return alert("오류가 발생했습니다. 다시 로그인해주세요.");
		}
	}, [navigate]);

	let boxClass = "w-5 h-5 rounded-full";
	let boxText = "";

	switch (status) {
		case DoorStatus.LOCKED:
			boxClass = `${boxClass} bg-red1`;
			boxText = "출입 제한 상태";
			break;

		case DoorStatus.RESTRICTED:
			boxClass = `${boxClass} bg-green1`;
			boxText = "QR 출입 상태";
			break;

		case DoorStatus.UNLOCKED:
			boxClass = `${boxClass} bg-blue1`;
			boxText = "자유 출입 상태";
			break;

		default:
			boxClass = `${boxClass} bg-gray-200`;
			boxText = "로딩 중...";
			break;
	}

	return (
		<div className="w-full h-[60%] flex justify-center items-center">
			<div className=" w-[20rem] h-[25rem] bg-gradient-24 from-gr1 to-gr2 rounded-3xl flex flex-col shadow-2xl items-center">
				<div className="w-full h-full flex items-center justify-center pt-4">
					<div className=" w-56 h-56 bg-white rounded-2xl flex items-center justify-center">
						<QRCode
							className=" w-48 h-48"
							value={localStorage.getItem("code") || ""}
							size={256}
							bgColor="#FFFFFF"
							onClick={() => navigate("/qr")}
						/>
					</div>
				</div>
				<div className="w-48 h-20 bg-black1 mb-16 mt-auto rounded-xl shadow-2xl text-white flex flex-row justify-start items-center">
					<div className="pl-3 w-fit">
						<div className={boxClass} />
					</div>
					<div className=" w-full text-center text-xl font-medium pr-3">
						{boxText}
					</div>
				</div>
			</div>
		</div>
	);
};
