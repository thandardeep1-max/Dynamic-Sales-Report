const canvas = document.getElementById("salesChart");
const ctx = canvas.getContext("2d");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

let salesData = [45000, 62000, 55000, 78000, 68000, 90000];


function generateData() {

    salesData = months.map(() => {
        return Math.floor(Math.random() * 80000) + 20000;
    });

    updateDashboard();
    drawChart();
    createSalesTable();

    document.getElementById("status").textContent =
        "Sales data updated successfully!";
}


function updateDashboard() {

    const total = salesData.reduce((sum, value) => sum + value, 0);

    const average = total / salesData.length;

    const products = Math.floor(total / 1000);

    const highest = Math.max(...salesData);

    const bestMonth = months[salesData.indexOf(highest)];


    document.getElementById("totalSales").textContent =
        "₹" + total.toLocaleString("en-IN");

    document.getElementById("productsSold").textContent =
        products.toLocaleString("en-IN");

    document.getElementById("averageSales").textContent =
        "₹" + Math.round(average).toLocaleString("en-IN");

    document.getElementById("bestMonth").textContent =
        bestMonth;
}


function createSalesTable() {

    const tableBody = document.getElementById("salesTable");

    tableBody.innerHTML = "";

    salesData.forEach((sales, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${months[index]}</td>
            <td>₹${sales.toLocaleString("en-IN")}</td>
            <td>${Math.floor(sales / 1000)}</td>
        `;

        tableBody.appendChild(row);
    });
}


function drawChart() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const chartHeight = 300;
    const chartBottom = 350;

    const maxValue = Math.max(...salesData);

    const barWidth = 80;
    const gap = 50;

    const colors = [
        "#2563eb",
        "#16a34a",
        "#f59e0b",
        "#dc2626",
        "#9333ea",
        "#0891b2"
    ];

    salesData.forEach((value, index) => {

        const barHeight =
            (value / maxValue) * chartHeight;

        const x =
            80 + index * (barWidth + gap);

        const y =
            chartBottom - barHeight;


        ctx.fillStyle = colors[index];

        ctx.fillRect(
            x,
            y,
            barWidth,
            barHeight
        );


        ctx.fillStyle = "#222";

        ctx.font = "14px Arial";

        ctx.textAlign = "center";

        ctx.fillText(
            "₹" + Math.round(value / 1000) + "K",
            x + barWidth / 2,
            y - 10
        );


        ctx.fillStyle = "#555";

        ctx.fillText(
            months[index],
            x + barWidth / 2,
            chartBottom + 25
        );
    });


    ctx.beginPath();

    ctx.moveTo(50, chartBottom);
    ctx.lineTo(850, chartBottom);

    ctx.strokeStyle = "#999";

    ctx.stroke();


    ctx.beginPath();

    ctx.moveTo(50, 30);
    ctx.lineTo(50, chartBottom);

    ctx.stroke();
}

function updateDateTime() {

    const now = new Date();

    document.getElementById("dateTime").textContent =
        now.toLocaleString("en-IN");
}


updateDashboard();

drawChart();

createSalesTable();

updateDateTime();


setInterval(updateDateTime, 1000);