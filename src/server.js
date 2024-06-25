import net from "net";
import initServer from "./init/index.js";

const PORT = 5555;

const server = net.createServer((socket) =>
{
	console.log(`클라이언트가 연결되었습니다: ${socket.remoteAddress}:${socket.remotePort}`);

	socket.on("data", (data) =>
	{
		console.log(data);
	});

	socket.on("end", () =>
	{
		console.log(`클라이언트 연결이 해제되었습니다: ${socket.remoteAddress}:${socket.remotePort}`);
	});

	socket.on("error", (err) =>
	{
		console.log(`소켓에서 에러가 발생했습니다: ${err}`);
	});
});

initServer().then(() =>
{
	server.listen(PORT, () =>
	{
		console.log(`서버가 ${PORT}번 포트로 동작중입니다.`);
		console.log(server.address());
	});
}).catch((error) =>
{
	console.error(error);
	process.exit(1); // 오류 발생 시 프로세스 종료
});