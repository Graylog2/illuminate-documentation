       document.addEventListener("DOMContentLoaded", function () {
            function showOutput() {
                const users = document.getElementById("numbers").value;
                const retention = document.getElementById("retention").value;
                let output = "";

                if (users === "1") {
                    if (retention === "1") {
                        output = "Core Architecture";
                        populateTable([1, 8, 16, 1, 8, 24]);
                    } else if (retention === "2") {
                        output = "Conventional Architecture";
                        clearTable();
                    }
                } else if (users === "2") {
                    if (retention === "1") {
                        output = "Conventional Architecture";
                        clearTable();
                    } else if (retention === "2") {
                        output = "Custom Architecture";
                        clearTable();
                    }
                } else if (users === "3") {
                    output = "Custom Architecture";
                    clearTable();
                }

                document.getElementById("output").textContent = output;
            }

            function populateTable(values) {
                const cells = document.querySelectorAll(".TableStyle-Alternate-Row-Color-Body-Body1 td");
                cells.forEach((cell, index) => {
                    if (values[index] !== undefined) {
                        cell.textContent = values[index];
                    }
                });
            }

            function clearTable() {
                const cells = document.querySelectorAll(".TableStyle-Alternate-Row-Color-Body-Body1 td");
                cells.forEach(cell => {
                    cell.textContent = "";
                });
            }

            document.getElementById("numbers").addEventListener("change", showOutput);
            document.getElementById("retention").addEventListener("change", showOutput);
        });