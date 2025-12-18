let saldoKonta = 1000;

function wyplacPieniadze(kwota) {
  return new Promise((resolve, reject) => {
    console.log("⏳ Trwa łączenie z bankiem...");

    setTimeout(() => {
      if (kwota > saldoKonta) {
        reject(new Error(`Brak środków na koncie! Masz tylko ${saldoKonta}`));
      } else if (kwota <= 0) {
        reject(new Error("Kwota powinna być większa od zera"));
      } else {
        saldoKonta -= kwota;
        resolve(`✅ Wypłacono ${kwota} PLN. Pozostało: ${saldoKonta} PLN.`);
      }
    }, 2000);
  });
}

async function uruchomBankomat() {
  try {
    console.log(await wyplacPieniadze(500));
    console.log(await wyplacPieniadze(800));
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log("--- Dziękujemy za skorzystanie z usług ---");
  }
}

uruchomBankomat();