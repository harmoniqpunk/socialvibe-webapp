<script lang="ts">
    import { colors } from '$lib/style/colors';
    import { onMount } from 'svelte';
    import { Button, Modal } from 'flowbite-svelte';

    let discoverMoreVisible = true;
    let bottomBarHeight = 0;
    let showModal = false;
    let selectedFeature: { title: string; summary: string } | null = null;

    onMount(() => {
        const handleScroll = () => {
            discoverMoreVisible = window.scrollY < 50;
        };

        const detectBottomBar = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.clientHeight;
            bottomBarHeight = windowHeight - documentHeight;
        };

        window.addEventListener('scroll', handleScroll);
        detectBottomBar();
        window.addEventListener('resize', detectBottomBar);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', detectBottomBar);
        };
    });

    function openModal(feature: { title: string; summary: string }) {
        selectedFeature = feature;
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    const features = [
        {
            title: "Environments",
            summary: "Environments are specialized virtual environments available in the marketplace, built by developers, artists or algorithmically synthesized. An environment define a context and is built with components like assets, agents and policies. You can compose your own environment using the in-app Environment Compositor."
        },
        {
            title: "Abilities",
            summary: "Agent abilities are created within environments. Users can train agents to learn from their own abilities and export learned control policies to the real world agents via Sim2Real interfaces."
        },
        {
            title: "Sim2Real",
            summary: "Users can attach a Sim2Real interface to any environment. This interface transfers the learned control policies in simulation to the real world so these policies can effectively control digital factories, robotics, or various vehicles (cars, drones, airplanes, boats)."
        },
        {
            title: "Monetize",
            summary: "Studios, developers or artists can create environments, assets, agents, policies or Sim2Real interfaces to monetise them in our marketplace as RGB Smart Contracts. Trainers can create abilities to also monetise them as RGB Smart Contracts in our marketplace. We are aiming to commoditize intellectual and physical abilities with smart contracts"
        },
        {
            title: "Marketplace",
            summary: "You can publish your environments, assets, agents, policies or Sim2Real interfaces to the marketplace as RGB Smart Contracts. We are charging a 3% publishing fee on top of a publisher membership of $49/year."
        },
        {
            title: "Network",
            summary: "You will be able to connect with the other participants in the network, you can follow them, and interact with theirs content."
        }
    ];
</script>

<!-- First Section (Positive Color Scheme) -->
<section class="positive-section min-h-screen flex flex-col justify-between bg-light-positive-background dark:bg-dark-positive-background positive-section">
	<div class="w-full xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-0 md:px-6 flex-grow flex items-center">
		<div class="flex flex-col md:flex-row mb-0 md:mb-32 w-full">
			<!-- Left column (content) -->
			<div class="w-full md:w-1/2 mb-8 md:mb-0 p-4 md:p-0 lg:pr-16 xl:pr-24">
				<h1 class="text-5xl md:text-6xl lg:text-7xl mb-12 text-light-positive-primary dark:text-dark-positive-primary tracking-wider text-center md:text-center">
					<span class="font-light text-light-positive-primary dark:text-dark-positive-primary">OS</span><sup class="text-light-positive-glow dark:text-dark-positive-glow font-normal text-3xl md:text-4xl lg:text-5xl">4</sup>
				</h1>
				

				<ul class="text-base md:text-xl lg:text-2xl text-light-positive-text dark:text-dark-positive-text md:font-light leading-relaxed tracking-wide list-disc pl-6 space-y-4 md:space-y-8">
					<li class="mb-4 md:mb-8">OS<sup>4</sup> captures your abilities into simulation.</li>
					<li class="mb-4 md:mb-8">It learns from you and transfers your abilities back into the reality.</li>
					<li class="mb-4 md:mb-8">As you explore it, unexpected rewards are waiting for you.</li>
					<li>Ignite the positive aspects of the 4th industrial revolution.</li>
				</ul>

				<div class="flex flex-col items-start pt-12 w-full">
					
					<div class="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
						<Button href="https://www.oculus.com/experiences/quest/" target="_blank" rel="noopener noreferrer" 
								class="w-full h-14 md:h-16 flex items-center justify-center bg-light-positive-button-bg dark:bg-dark-positive-button-bg text-light-positive-button-text dark:text-dark-positive-button-text hover:bg-light-positive-button-hover-bg dark:hover:bg-dark-positive-button-hover-bg hover:text-light-positive-button-hover-text dark:hover:text-dark-positive-button-hover-text transition-colors duration-200 rounded-full">
							<div class="flex items-center justify-center space-x-2 w-4/5">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 32 32">
									<path fill="currentColor" d="M24.182 18.599a3.3 3.3 0 0 1-1.411.552c-.51.083-1.016.068-1.521.068h-10.5c-.51 0-1.016.021-1.526-.068a3.4 3.4 0 0 1-1.411-.552a3.18 3.18 0 0 1-1.365-2.604a3.13 3.13 0 0 1 1.37-2.599a3.26 3.26 0 0 1 1.396-.557c.5-.083 1-.083 1.526-.083h10.5c.5 0 1.016-.016 1.516.063s.984.26 1.401.542a3.11 3.11 0 0 1 1.365 2.599c0 1.036-.526 2-1.38 2.599zm4.229-10.073a9.6 9.6 0 0 0-3.818-1.865a12 12 0 0 0-2.432-.307c-.599-.021-1.198-.01-1.818-.01h-8.661c-.609 0-1.224-.01-1.833.01c-.823.026-1.63.109-2.432.307a9.7 9.7 0 0 0-3.818 1.865A9.56 9.56 0 0 0 0 16a9.58 9.58 0 0 0 3.583 7.474a9.7 9.7 0 0 0 3.823 1.87c.802.193 1.609.281 2.432.302c.599.021 1.198.016 1.818.016h8.661c.599 0 1.219.005 1.818-.016c.823-.021 1.62-.109 2.417-.302a9.9 9.9 0 0 0 3.823-1.87C30.682 21.651 32 18.906 32 16s-1.318-5.656-3.589-7.474" />
								</svg>
								<span class="text-base md:text-lg">Oculus</span>
							</div>
						</Button>
						<Button disabled 
								class="w-full h-14 md:h-16 flex items-center justify-center bg-light-positive-muted dark:bg-dark-positive-muted text-light-positive-muted-text dark:text-dark-positive-muted-text cursor-not-allowed rounded-full">
							<div class="flex items-center justify-center space-x-2 w-4/5">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-9 h-9 md:w-10 md:h-10" viewBox="0 0 24 24">
									<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7q1.715 0 3.275.104q1.526.101 2.798.42q1.22.304 2.119.909a3.9 3.9 0 0 1 1.328 1.531c.326.657.48 1.48.48 2.466q.002 1.51-.574 2.707q-.562 1.17-1.537 1.848a3.7 3.7 0 0 1-2.16.66q-.764.002-1.382-.21a6 6 0 0 1-1.17-.548a19 19 0 0 1-1.045-.695a9 9 0 0 0-1.001-.63a2.4 2.4 0 0 0-1.13-.301c-.373 0-.75.097-1.132.3q-.475.255-1 .63q-.482.345-1.047.695a5.8 5.8 0 0 1-1.168.548q-.62.212-1.378.21a3.7 3.7 0 0 1-2.165-.659q-.976-.68-1.537-1.848q-.576-1.196-.574-2.709c-.004-.98.15-1.802.477-2.46a3.9 3.9 0 0 1 1.33-1.531q.9-.604 2.12-.907a16 16 0 0 1 2.8-.423Q10.287 7 12 7" />
								</svg>
								<span class="text-base md:text-lg">VisionOS</span>
							</div>
						</Button>
						<Button href="https://play.google.com" target="_blank" rel="noopener noreferrer" 
								class="w-full h-14 md:h-16 flex items-center justify-center bg-light-positive-button-bg dark:bg-dark-positive-button-bg text-light-positive-button-text dark:text-dark-positive-button-text hover:bg-light-positive-button-hover-bg dark:hover:bg-dark-positive-button-hover-bg hover:text-light-positive-button-hover-text dark:hover:text-dark-positive-button-hover-text transition-colors duration-200 rounded-full">
							<div class="flex items-center justify-center space-x-2 w-4/5">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24">
									<g fill="none" fill-rule="evenodd">
										<path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
										<path fill="currentColor" d="M20 14v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-5zM12 3c1.33 0 2.584.324 3.687.899l.606-.606a1 1 0 1 1 1.414 1.414l-.35.35A7.98 7.98 0 0 1 20 11v1H4v-1a7.98 7.98 0 0 1 2.644-5.942l-.351-.35a1 1 0 0 1 1.414-1.415l.606.606A8 8 0 0 1 12 3M9 7a1 1 0 1 0 0 2a1 1 0 0 0 0-2m6 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2" />
									</g>
								</svg>
								<span class="text-base md:text-lg">Android</span>
							</div>
						</Button>
						<Button disabled
								class="w-full h-14 md:h-16 flex items-center justify-center bg-light-positive-muted dark:bg-dark-positive-muted text-light-positive-muted-text dark:text-dark-positive-muted-text cursor-not-allowed rounded-full">
							<div class="flex items-center justify-center space-x-2 w-4/5">
								<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24">
									<path fill="currentColor" d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25" />
								</svg>
								<span class="text-base md:text-lg">iOS</span>
							</div>
						</Button>
					</div>
				</div>
			</div>
			
			<!-- Right column (image background) -->
			<div class="w-full md:w-1/2 h-64 md:h-auto">
				<div class="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
					<span class="text-gray-500 dark:text-gray-400">Placeholder Image</span>
				</div>
			</div>
		</div>
	</div>
    
    <div class="fixed left-0 right-0 bottom-4 md:bottom-4 flex justify-center transition-opacity duration-300" 
         class:opacity-0={!discoverMoreVisible} 
         class:pointer-events-none={!discoverMoreVisible}>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20 animate-bounce text-light-positive-glow dark:text-dark-positive-glow"  viewBox="0 0 48 48">
            <defs>
                <mask id="ipSDownC0">
                    <g fill="none" stroke-linejoin="round" stroke-width="4">
                        <path fill="#fff" stroke="#fff" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
                        <path stroke="#000" stroke-linecap="round" d="m33 21l-9 9l-9-9" />
                    </g>
                </mask>
            </defs>
            <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSDownC0)" />
        </svg>
    </div>
</section>

<!-- Second Section (Negative Color Scheme) -->
<section class="bg-light-negative-background dark:bg-dark-negative-background py-16 md:py-24 negative-section">
	<div class="w-full max-w-[95%] xl:max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6">
		<h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center text-light-negative-primary dark:text-dark-negative-primary">Features</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-x-24 md:gap-y-32">
			{#each features as feature, index}
				<div class="flex flex-col h-full">
					<div class="flex justify-between items-start mb-4 md:mb-6">
						<h3 class="text-2xl md:text-3xl lg:text-4xl font-light text-light-negative-primary dark:text-dark-negative-primary">{feature.title}</h3>
					</div>
					<p class="text-light-negative-primary dark:text-dark-negative-primary text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 flex-grow overflow-hidden line-clamp-4">{feature.summary}</p>
					<button on:click={() => openModal(feature)} class="self-start bg-light-negative-button-bg dark:bg-dark-negative-button-bg text-light-negative-button-text dark:text-dark-negative-button-text hover:bg-light-negative-button-hover hover:text-light-negative-button-hover-text dark:hover:bg-dark-negative-button-hover-bg dark:hover:text-dark-negative-button-hover-text transition-colors duration-200 rounded-full px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl lg:text-2xl font-bold">
						Read More
					</button>
				</div>
				{#if (index + 1) % 6 !== 0}
					<hr class="border-t border-light-negative-muted dark:border-dark-negative-muted my-6 md:hidden">
				{/if}
			{/each}
		</div>
	</div>
</section>

<!-- Modal -->
<Modal bind:open={showModal} size="xl" autoclose={false} class="w-full custom-modal">
  <div class="bg-light-positive-background dark:bg-dark-positive-background p-8">
    <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center text-light-positive-primary dark:text-dark-positive-primary">
      {selectedFeature?.title}
    </h2>
    <hr class="border-t border-light-positive-muted dark:border-dark-positive-muted mb-8">
    <p class="text-light-positive-primary dark:text-dark-positive-primary text-lg md:text-xl lg:text-2xl mb-8 py-6">
      {selectedFeature?.summary}
    </p>
    <hr class="border-t border-light-positive-muted dark:border-dark-positive-muted mb-8">
    <div class="flex justify-center">
      <button on:click={closeModal} class="bg-light-positive-button-bg dark:bg-dark-positive-button-bg text-light-positive-button-text dark:text-dark-positive-button-text hover:bg-light-positive-button-hover hover:text-light-positive-button-hover-text dark:hover:bg-dark-positive-button-hover-bg dark:hover:text-dark-positive-button-hover-text transition-colors duration-200 rounded-full px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl lg:text-2xl font-bold">
        Close
      </button>
    </div>
  </div>
</Modal>

<style lang="postcss">
	:global(body) {
		@apply bg-light-positive-background dark:bg-dark-positive-background text-light-positive-primary dark:text-dark-positive-primary;
	}

	/* Update this style to include both positive and negative sections */
	h1, h2, h3 {
		@apply text-light-positive-primary dark:text-dark-positive-primary;
	}

	/* Add a new style for headings in the negative section */
	:global(.bg-light-negative-background) h1,
	:global(.bg-light-negative-background) h2,
	:global(.bg-light-negative-background) h3,
	:global(.bg-dark-negative-background) h1,
	:global(.bg-dark-negative-background) h2,
	:global(.bg-dark-negative-background) h3 {
		@apply text-light-negative-primary dark:text-dark-negative-primary;
	}

	p {
		@apply mb-4;
	}

	/* Custom styles for the modal */
	:global(.custom-modal .flex.items-center.justify-between.p-5.border-b) {
		display: none !important;
	}

	:global(.custom-modal .p-6) {
		padding-top: 0 !important;
	}

	/* Hide the top right close button */
	:global(.modal-content button[type="button"]) {
		display: none !important;
	}

	:global(.modal-content) {
		@apply bg-light-positive-background dark:bg-dark-positive-background;
	}
</style>


