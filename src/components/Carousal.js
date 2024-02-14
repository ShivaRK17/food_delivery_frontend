import React from 'react'

const Carousal = () => {
    return (
        <>
            <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel" >
                <div class="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://as1.ftcdn.net/v2/jpg/03/11/40/64/1000_F_311406407_Am9IPpUHa74wHLPukkRkp69flTuzLGAL.jpg" className="" style={{height:'350px',width:'100vw',objectFit:'cover'}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://t3.ftcdn.net/jpg/07/03/58/98/240_F_703589867_VzHjs9nBiDkEAuRJbIYqpc68dL6qsPwt.jpg" className="" style={{height:'350px',width:'100vw',objectFit:'cover'}} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://t4.ftcdn.net/jpg/06/98/79/39/240_F_698793954_HQeXHeSSq7UPPnadsxXttVvfgNQdTRXN.jpg" className="" style={{height:'350px',width:'100vw',objectFit:'cover'}} alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

        </>
    )
}

export default Carousal