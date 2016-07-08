class Scraper::NetshoesScraper

	BASE_URL = "http://www.netshoes.com.br"
	FILTER = "tenis?mi=hm_ger_mnleft_TEN-tenis&psn=Menu_Left&fc=menu"
	BATCH_SIZE = 60

	OUTPUT_PATH = Rails.root.join("systennis").to_s
	OUTPUT_FILE = "#{OUTPUT_PATH}/systennis_prod_2.txt"

	OUTPUT_QUERY_FILE = "#{OUTPUT_PATH}/systennis_prod_queries.txt"
	INSERT_STATEMENT = "INSERT INTO tb_produto (nome_prod, desc_prod, tipo_prod," +
					   "subtipo_prod, cor_prod, marca_prod, preco_prod, estoque_prod," +
					   "url_imagem) VALUES "

	def initialize()
		@agent = Mechanize.new()
		@agent.get("#{BASE_URL}/#{FILTER}")
		@page_count = 0
		FileUtils.mkdir_p OUTPUT_PATH
	end

	def fetch_and_scrape(filter = nil)
		@agent.get("#{BASE_URL}/#{filter}") if !!filter

		pc = BATCH_SIZE - 1
		@page_count += 1

		if !@agent.page.at('.results-show').at('.label').children.empty?
			pc_lower_bound = (@agent.page.at('.results-show').at('.label').children[0].to_s)
									   .scan(/Exibindo:.*(\d).*/).first.first.to_i
			@pc_upper_bound = @agent.page.at('.results-show')
									   .at('.label').children[1].children[0].to_s.to_i
			pc = @pc_upper_bound - pc_lower_bound
		end

		prod_list = @agent.page.at('.body-wrapper').at('.body-holder')
							   .at('.results-wrapper').at('.product-list')

		batch = {}
		failure_count = 0

		(0..pc).each do |num|

			if (prod_list.at("#product#{num}").class != NilClass && !prod_list.at("#product#{num}").at('.single-product').children.empty?)
				img_url =
					"http:" +
					@agent.page
					.at('.body-wrapper')
					.at('.body-holder')
					.at('.results-wrapper')
					.at('.product-list')
					.at("#product#{num}")
					.at('.single-product')
					.children[0]
					.at('.product-img')
					.at('.aligner')
					.at('.lazy')
					.attributes["data-src"].value
					.gsub(/\?resize.*/, "")

				begin
				batch[num] =
					eval(@agent.page
					.at('.body-wrapper')
					.at('.body-holder')
					.at('.results-wrapper')
					.at('.product-list')
					.at("#product#{num}")
					.at('.single-product')
					.children[0]
					.attributes["data-product"].value)
					.merge({img: img_url})
				rescue Exception => e
					puts e.message
					failure_count += 1
					next
				end

				puts "#{batch[num][:name]} [ADDED]"
			end
		end

		push_into_txt(OUTPUT_FILE, batch)
		puts "------------------------------------------------"
		puts "#{batch.count - failure_count} products [FETCHED], #{failure_count} [FAILED] at Page #{@page_count}"
		puts "------------------------------------------------"

		next_page_filter = !@agent.page.at('.is-next').nil? ? @agent.page.at('.is-next').attributes["href"].value : nil

		if !!next_page_filter
			fetch_and_scrape(next_page_filter)
		else
			puts "Finished scraping process in [#{Time.now - @t1} seconds]. Please check #{OUTPUT_FILE}"
		end
	end

	def push_into_txt(output_file, hashtable)
		file = File.open(output_file, "a")
		hashtable.each do |k, v|
			file << v.to_s + ",\n"
		end
		file.close
	end

	def self.output_queries()
		f = File.open(OUTPUT_FILE, 'r')

		intro_array 	   = ["faz parte da última coleção de 2016.",
											 "faz parte da linha de luxo oferecida pela Systennis.",
											 "é um dos calçados mais vendidos no Brasil.",
											 "é extremamente renomado pela sua qualidade."]
		qualities_array  = ["duradouro", "macio", "elegante", "confortável",
											 "prático"]
	  qualities_array2 = ["moderno", "atraente", "discreto", "resistente", "estiloso"]
		final_phrase     = ["a escolha perfeita para você que procura", "indicado para quem não abre mão de",
											 "o melhor tênis para quem quer", "a última palavra em termos de"]
		noun_array  		 = ["estilo", "conforto", "tecnologia", "resiliência", "praticidade",
											 "leveza"]

		f.each_line do |line|
		  begin
			  tennis = eval(line)

			  nome_prod = tennis[:name]
			  desc_prod = "O #{nome_prod} #{intro_array.sample} #{qualities_array.sample.capitalize}" +
			  						" e #{qualities_array2.sample}, #{final_phrase.sample} #{noun_array.sample}."
			  tipo_prod = tennis[:subcategory]
			  subtipo_prod = tennis[:category]
			  cor_prod = tennis[:variant]
			  marca_prod = tennis[:brand]
			  preco_prod = tennis[:price].to_f
			  estoque_prod = 50
			  url_imagem = tennis[:img]
			  desc_prod << " Recomendado para #{subtipo_prod}." if subtipo_prod != "Casual"

			  INSERT_STATEMENT << "('#{nome_prod}', '#{desc_prod}', '#{tipo_prod}', '#{subtipo_prod}'," +
			  					  "'#{cor_prod}', '#{marca_prod}', '#{preco_prod}', '#{estoque_prod}'," +
			  					  "'#{url_imagem}'),\n"

		  rescue Exception => e
		  	puts e.message
		  	next
		  end
		end
		f.close

		f = File.open(OUTPUT_QUERY_FILE, 'w')
		f << INSERT_STATEMENT[0..-2]
		f.close
	end


	def self.automate(generate_queries = false)
		@t1 = Time.now
		scraper = Scraper::NetshoesScraper.new()
		scraper.fetch_and_scrape
		output_queries if generate_queries
	end

end
